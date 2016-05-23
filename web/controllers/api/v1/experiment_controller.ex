defmodule EmotionsWheelBackend.ExperimentController do
  use EmotionsWheelBackend.Web, :controller

  import Ecto.Query, only: [from: 2]

  alias EmotionsWheelBackend.{Repo, Experiment, Participant, ExperimentsHasParticipants}

  def index(conn, _params) do
    experiments = Experiment |> Repo.all
    render(conn, "index.json", experiments: experiments)
  end

  def show(conn, %{"id" => id}) do
    experiment = Experiment |> Repo.get(id)

    case experiment do
      nil ->
        conn
        |> put_status(:not_found)
        |> render("error.json", message: "Couldn't find matching experiment")
      _ ->
        attached_participants = fetch_participants(experiment)

        conn
        |> render("show.json", experiment: Map.put(experiment, :attached_participants, attached_participants))
    end
  end

  def create(conn, %{"experiment" => experiment_params}) do
    experiment_changeset = Experiment.changeset(%Experiment{}, experiment_params)

    if experiment_changeset.valid? do
      experiment = Repo.insert!(experiment_changeset)

      case Map.fetch(experiment_params, "participants_ids") do
        {:ok, participants_ids} ->
          add_participants_to_experiment(participants_ids, experiment)
      end

      conn
      |> put_status(:created)
      |> render("success.json", experiment: experiment)
    else
      conn
      |> put_status(:unprocessable_entity)
      |> render("error.json", changeset: experiment_changeset)
    end
  end

  def update(conn, %{"id" => id, "experiment" => experiment_params}) do
    experiment = Experiment |> Repo.get!(id)

    experiment_changeset = Experiment.changeset(experiment, experiment_params)

    if experiment_changeset.valid? do
      participants_ids = experiment_params |> Map.fetch!("participants_ids")

      experiment = Repo.update!(experiment_changeset)

      case update_participants_in_experiment(participants_ids, experiment.id) do
        {:ok, _} ->
          attached_participants = fetch_participants(experiment)

          conn
          |> put_status(:created)
          |> render("success.json", experiment: Map.put(experiment, :attached_participants, attached_participants))
      end
    else
      conn
      |> put_status(:unprocessable_entity)
      |> render("error.json", changeset: experiment_changeset)
    end
  end

  defp add_participants_to_experiment(participants_ids, experiment) do
    for participant_id <- participants_ids do
      insert_participant(participant_id, experiment.id)
    end
  end

  defp update_participants_in_experiment(new_participants, experiment_id) do
    all_ehp = ExperimentsHasParticipants |> Repo.all(experiment_id: experiment_id)

    saved_participants = all_ehp |> Enum.map(fn(ehp) ->
      ehp.participant_id
    end)

    diff = (new_participants -- saved_participants) ++ (saved_participants -- new_participants)

    Repo.transaction(fn ->

      for participant_id <- diff do
        if Enum.member?(saved_participants, participant_id) do
          remove_participant(participant_id, experiment_id)
        else
          insert_participant(participant_id, experiment_id)
        end
      end

    end)
  end

  defp insert_participant(participant_id, experiment_id) do
    changeset = ExperimentsHasParticipants.changeset(
      %ExperimentsHasParticipants{},
      %{"participant_id" => participant_id, "experiment_id" => experiment_id}
    )

    changeset |> Repo.insert!
  end

  defp remove_participant(participant_id, experiment_id) do
    ExperimentsHasParticipants
    |> Repo.get_by!(
      participant_id: participant_id,
      experiment_id: experiment_id
    )
    |> Repo.delete!
  end

  defp fetch_participants(experiment) do
    ehp_query = from ehp in ExperimentsHasParticipants,
      where: ehp.experiment_id == ^experiment.id,
      select: ehp

    ehp_model = Repo.all(ehp_query)

    participants_uuids = ehp_model |> Enum.map(fn(record) -> %{id: record.participant_id, uuid: record.uuid} end)
    participants_ids = ehp_model |> Enum.map(fn(record) -> record.participant_id end)

    p_query = from p in Participant,
      where: p.id in ^participants_ids,
      select: p

    p_model = Repo.all(p_query)

    built_participant_model = p_model |> Enum.map(fn(participant) ->
      participant_uuid = Enum.find(participants_uuids, fn(item) -> participant.id == item.id end)
      participant |> Map.put(:experiment_uuid, participant_uuid.uuid)
    end)

    built_participant_model
  end
end
