defmodule EmotionsWheelBackend.ExperimentView do
  use EmotionsWheelBackend.Web, :view

  alias EmotionsWheelBackend.{Photo, PhotoView, ParticipantView}

  @attributes_index ~w(id name kind start_date end_date)a
  @attributes_single ~w(id name kind start_date end_date researcher_id participants photos)a
  @attributes_single_photos_researcher ~w(id name kind start_date end_date researcher photos)a

  def render("index.json", %{experiments: experiments}) do
    %{experiments: experiments |> render_many}
  end

  def render("show.json", %{experiment: experiment}) do
    %{experiment: experiment |> render_one}
  end

  def render("success.json", %{experiment: experiment}) do
    %{experiment: experiment |> render_one}
  end

  def render("error.json", %{message: message}) do
    %{message: message}
  end

  def render("error.json", %{changeset: changeset}) do
    %{changeset: changeset}
  end

  def render_many(experiments) do
    experiments |> Enum.map(&Map.take(&1, @attributes_index))
  end

  def render_one(experiment, :lite) do
    attributes = ~w(id name kind start_date end_date photos)a

    experiment
    |> Map.take(attributes)
    |> Map.put(:photos, experiment.photos |> set_photos(experiment.experiments_has_photos))
  end

  def render_one(experiment, attributes \\ @attributes_single) do
    experiment
    |> Map.take(attributes)
    |> Map.put(:participants, experiment.participants |> ParticipantView.render_many)
    |> Map.put(:photos, experiment.photos |> set_photos(experiment.experiments_has_photos))
  end

  def render_one_photos_researcher(experiment, attributes \\ @attributes_single_photos_researcher) do
    experiment
    |> Map.take(attributes)
    |> Map.put(:photos, experiment.photos |> set_photos(experiment.experiments_has_photos))
  end

  defp set_photos(photos, experiments_has_photos) do
    photos
    |> Enum.map(&PhotoView.render_one(&1))
    |> Enum.sort(fn(p1, p2) ->
      p1_ehph = Enum.find(experiments_has_photos, &(&1.photo_id == p1.id))
      p2_ehph = Enum.find(experiments_has_photos, &(&1.photo_id == p2.id))

      p2_ehph.order_no > p1_ehph.order_no
    end)
  end
end
