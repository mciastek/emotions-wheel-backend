defmodule EmotionsWheelBackend.ExperimentController do
  use EmotionsWheelBackend.Web, :controller

  import Ecto.Query, only: [from: 2]

  alias EmotionsWheelBackend.{Repo, Experiment}

  def index(conn, _params) do
    experiments = Experiment.with_participants_and_photos |> Repo.all
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

      experiment = Repo.insert!(experiment_changeset)

      transaction = Repo.transaction(fn ->
        "participant" |> insert_assoc_multiple(experiment.id, participants_ids)
        "photo" |> insert_assoc_multiple(experiment.id, photos_ids)
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

      experiment = experiment_changeset |> Repo.update!

      transaction = Repo.transaction(fn ->
        experiment.id |> update_assoc_in_experiment("participant", participants_ids)
        experiment.id |> update_assoc_in_experiment("photo", photos_ids)
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

  defp update_assoc_in_experiment(experiment_id, model_name, ids) do
    model_name_pluralized = "#{model_name}s"

    assoc_model = model_name_pluralized |> assoc_query(experiment_id) |> Repo.all

    saved_ids = assoc_model |> Enum.map(fn(record) ->
      Map.get(record, :"#{model_name}_id")
    end)

    diff = (ids -- saved_ids) ++ (saved_ids -- ids)

    for id <- diff do
      if Enum.member?(saved_ids, id) do
        model_name |> remove_assoc(experiment_id, id)
      else
        model_name |> insert_assoc(experiment_id, id)
      end
    end
  end

  defp insert_assoc_multiple(model_name, experiment_id, ids) do
    for id <- ids do
      model_name |> insert_assoc(experiment_id, id)
    end
  end

  defp insert_assoc(model_name, experiment_id, record_id) do
    model = Module.concat(EmotionsWheelBackend, "ExperimentsHas#{String.capitalize(model_name)}s")
    record_key = "#{model_name}_id"

    changeset = model.changeset(
      struct(model),
      %{record_key => record_id, "experiment_id" => experiment_id}
    )

    changeset |> Repo.insert!
  end

  defp remove_assoc(model_name, experiment_id, record_id) do
    model = Module.concat(EmotionsWheelBackend, "ExperimentsHas#{String.capitalize(model_name)}s")

    model
    |> Repo.get_by!([{:"#{model_name}_id", record_id}, {:experiment_id, experiment_id}])
    |> Repo.delete!
  end

  defp assoc_query(model_name, experiment_id) do
    model = Module.concat(EmotionsWheelBackend, "ExperimentsHas#{String.capitalize(model_name)}")

    from m in model,
      where: m.experiment_id == ^experiment_id,
      select: m
  end

  defp participants_with_uuid(experiment) do
    experiment.participants |> Enum.map(fn(participant) ->
      ehp = experiment.experiments_has_participants
        |> Enum.find(&(&1.participant_id == participant.id))

      %{participant | :experiment_uuid => ehp.uuid}
    end)
  end
end
