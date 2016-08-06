defmodule EmotionsWheelBackend.GalleryView do
  use EmotionsWheelBackend.Web, :view

  alias EmotionsWheelBackend.{PhotoView}

  def render("index.json", %{photos: photos}) do
    %{photos: photos |> PhotoView.render_many}
  end
end
