defmodule EmotionsWheelBackend.ExperimentController do
  use EmotionsWheelBackend.Web, :controller

  alias EmotionsWheelBackend.{Repo, Experiment, ExperimentsHasParticipants}

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
      _ -> render(conn, "show.json", experiment: experiment)
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
end
