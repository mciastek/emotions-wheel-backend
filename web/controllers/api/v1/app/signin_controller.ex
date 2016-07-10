defmodule EmotionsWheelBackend.SignInController do
  use EmotionsWheelBackend.Web, :controller

  alias EmotionsWheelBackend.{Repo, ExperimentsHasParticipants, Experiment}

  def create(conn, %{"token" => token}) do
    experiments_has_participants = ExperimentsHasParticipants |> Repo.get_by(uuid: token)
    experiment = Experiment |> Repo.get(experiments_has_participants.experiment_id)

    case experiment do
      nil ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json", message: "No experiment found")
      _ ->
        conn
        |> check_if_experiment_active(experiment)
    end
  end

  defp check_if_experiment_active(conn, experiment) do
    case experiment |> Experiment.active? do
      true ->
        conn
        |> render("success.json", success: true)
      _ ->
        conn
        |> put_status(:forbidden)
        |> render("error.json", message: "Experiment is inactive")
    end
  end
end
