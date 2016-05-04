defmodule EmotionsWheelBackend.ExperimentController do
  use EmotionsWheelBackend.Web, :controller

  import Ecto.Query, only: [from: 2]

  alias EmotionsWheelBackend.{Repo, Experiment, Participant, ExperimentsHasParticipants}

  def index(conn, _params) do
    experiments = Experiment |> Repo.all
    render(conn, "index.json", experiments: experiments)
  end

  def show(conn, %{"id" => id}) do
    experiment = Experiment |> Repo.get_by(id: id)

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
          attach_participants_to_experiment(participants_ids, experiment)
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

  defp attach_participants_to_experiment(participants_ids, experiment) do
    for participant_id <- participants_ids do
      experiments_has_participants_changeset = ExperimentsHasParticipants.changeset(%ExperimentsHasParticipants{}, %{ "participant_id" =>participant_id, "experiment_id" => experiment.id })
      Repo.insert!(experiments_has_participants_changeset)
    end
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
