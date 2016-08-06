defmodule EmotionsWheelBackend.GalleryView do
  use EmotionsWheelBackend.Web, :view

  alias EmotionsWheelBackend.{PhotoView}

  def render("index.json", %{photos: photos}) do
    %{photos: photos |> PhotoView.render_many}
  end

  def render("success.json", %{photos: photos}) do
    %{photos: photos |> PhotoView.render_many}
  end

  def render("error.json", %{changeset: changeset}) do
    errors = Enum.map(changeset.errors, fn{field, details} ->
      "#{field}: #{details}"
    end)

    %{errors: errors}
  end
end
