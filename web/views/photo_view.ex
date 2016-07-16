defmodule EmotionsWheelBackend.PhotoView do
  use EmotionsWheelBackend.Web, :view

  alias EmotionsWheelBackend.{PhotoFileDefinition}

  @attributes ~W(id name thumb original author_type author_id)a

  def render("index.json", %{photos: photos}) do
    %{photos: photos |> Enum.map(&render_one(&1))}
  end

  def render("show.json", %{photo: photo}) do
    %{photo: photo |> render_one}
  end

  def render("success.json", %{photo: photo}) do
    %{photo: photo |> render_one}
  end

  def render("error.json", %{changeset: changeset}) do
    %{changeset: changeset}
  end

  def render_one(photo) do
    photo
    |> set_urls
    |> Map.take(@attributes)
  end

  defp set_urls(photo) do
    urls = PhotoFileDefinition.urls({ photo.file, photo })
    urls = %{urls | original: "/" <> urls.original}
    urls = %{urls | thumb: "/" <> urls.thumb}
    photo |> Map.merge(urls)
  end
end
