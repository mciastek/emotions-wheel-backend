defmodule EmotionsWheelBackend.ExperimentController do
  use EmotionsWheelBackend.Web, :controller

  alias EmotionsWheelBackend.{Repo, Experiment}

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
    changeset = Experiment.changeset(%Experiment{}, experiment_params)

    case Repo.insert(changeset) do
      {:ok, experiment} ->
        conn
        |> put_status(:created)
        |> render("success.json", experiment: experiment)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json", changeset: changeset)
    end
  end
end
