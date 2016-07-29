defmodule EmotionsWheelBackend.ExperimentView do
  use EmotionsWheelBackend.Web, :view

  alias EmotionsWheelBackend.{Photo, PhotoView}

  @attributes_index ~w(id name kind start_date end_date)a
  @attributes_single ~w(id name kind start_date end_date researcher_id participants photos)a
  @attributes_single_photos ~w(id name kind start_date end_date researcher_id photos)a

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

  def render_one(experiment) do
    experiment
    |> Map.take(@attributes_single)
    |> Map.put(:photos, experiment.photos |> set_photos)
  end

  def render_one_only_photos(experiment) do
    experiment
    |> Map.take(@attributes_single_photos)
    |> Map.put(:photos, experiment.photos |> set_photos)
  end

  defp set_photos(photos) do
    photos
    |> Enum.map(&PhotoView.render_one(&1))
  end
end
