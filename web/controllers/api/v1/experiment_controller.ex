defmodule EmotionsWheelBackend.ExperimentController do
  use EmotionsWheelBackend.Web, :controller

  import EmotionsWheelBackend.ExperimentUpdate
  alias EmotionsWheelBackend.{Repo, Experiment, ExperimentsHasPhotos}

  def index(conn, _params) do
    experiments = Experiment |> Repo.all
    render(conn, "index.json", experiments: experiments)
  end

  def show(conn, %{"id" => id}) do
    experiment = Experiment.with_participants_and_photos |> Repo.get(id)

    case experiment do
      nil ->
        conn
        |> put_status(:not_found)
        |> render("error.json", message: "Couldn't find matching experiment")
      _ ->
        conn
        |> render("show.json", experiment: %{experiment | :participants => participants_with_uuid(experiment)})
    end
  end

  def create(conn, %{"experiment" => experiment_params}) do
    experiment_changeset = Experiment.changeset(%Experiment{}, experiment_params)

    if experiment_changeset.valid? do
      participants_ids = experiment_params |> Map.fetch!("participants_ids")
      photos_ids = experiment_params |> Map.fetch!("photos_ids")
      photos_order = experiment_params |> Map.fetch!("photos_order")

      experiment = Repo.insert!(experiment_changeset)

      transaction = Repo.transaction(fn ->
        "participant" |> insert_assoc_multiple(experiment.id, participants_ids)
        "photo" |> insert_assoc_multiple(experiment.id, photos_ids)
        experiment.id |> update_photos_order(photos_order)
      end)

      case transaction do
        {:ok, _} ->
          conn
          |> put_status(:created)
          |> render("success.json", experiment: experiment)

        {:error, res} ->
          conn
          |> put_status(:unprocessable_entity)
          |> render("error.json", message: res)
      end

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
      photos_ids = experiment_params |> Map.fetch!("photos_ids")
      photos_order = experiment_params |> Map.fetch!("photos_order")

      experiment = experiment_changeset |> Repo.update!

      transaction = Repo.transaction(fn ->
        experiment.id |> update_assoc_in_experiment("participant", participants_ids)
        experiment.id |> update_assoc_in_experiment("photo", photos_ids)
        experiment.id |> update_photos_order(photos_order)
      end)

      case transaction do
        {:ok, _} ->
          experiment = Experiment.with_participants_and_photos |> Repo.get(id)

          conn
          |> render("success.json", experiment: %{experiment | :participants => participants_with_uuid(experiment)})

        {:error, res} ->

          conn
          |> put_status(:unprocessable_entity)
          |> render("error.json", message: res)
      end
    else
      conn
      |> put_status(:unprocessable_entity)
      |> render("error.json", changeset: experiment_changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    experiment = Experiment |> Repo.get!(id)

    case Repo.delete(experiment) do
      {:ok, _} ->
        experiments = Experiment.with_participants_and_photos |> Repo.all
        render(conn, "index.json", experiments: experiments)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json", changeset: changeset)
    end
  end

  defp update_photos_order(experiment_id, order) do
    order |> Enum.each(fn({order_no, photo_id}) ->
      ehp = ExperimentsHasPhotos
        |> Repo.get_by!(experiment_id: experiment_id, photo_id: photo_id)

      changeset = ExperimentsHasPhotos.changeset(ehp, %{:order_no => String.to_integer(order_no)})
      changeset |> Repo.update!
    end)
  end

  defp participants_with_uuid(experiment) do
    experiment.participants |> Enum.map(fn(participant) ->
      ehp = experiment.experiments_has_participants
        |> Enum.find(&(&1.participant_id == participant.id))

      %{participant | :experiment_uuid => ehp.uuid}
    end)
  end
end
