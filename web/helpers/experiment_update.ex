defmodule EmotionsWheelBackend.ExperimentUpdate do

  import Ecto.Query, only: [from: 2]

  alias EmotionsWheelBackend.{Repo}

  def update_assoc_in_experiment(experiment_id, model_name, ids) do
    model_name_pluralized = "#{model_name}s"

    assoc_model = model_name_pluralized
      |> assoc_query(experiment_id)
      |> Repo.all

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

  def insert_assoc_multiple(model_name, experiment_id, ids) do
    for id <- ids do
      model_name |> insert_assoc(experiment_id, id)
    end
  end

  def insert_assoc(model_name, experiment_id, record_id) do
    model = Module.concat(EmotionsWheelBackend, "ExperimentsHas#{String.capitalize(model_name)}s")
    record_key = "#{model_name}_id"

    changeset = model.changeset(
      struct(model),
      %{record_key => record_id, "experiment_id" => experiment_id}
    )

    changeset |> Repo.insert!
  end

  def remove_assoc(model_name, experiment_id, record_id) do
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
end
