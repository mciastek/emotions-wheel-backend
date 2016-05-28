defmodule EmotionsWheelBackend.PhotoView do
  use EmotionsWheelBackend.Web, :view

  def render("index.json", %{photos: photos}) do
    %{photos: photos}
  end

  def render("show.json", %{photo: photo}) do
    %{photo: photo}
  end

  def render("success.json", %{photo: photo}) do
    %{photo: photo}
  end

  def render("error.json", %{changeset: changeset}) do
    %{changeset: changeset}
  end
end
