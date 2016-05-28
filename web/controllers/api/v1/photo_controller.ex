defmodule EmotionsWheelBackend.PhotoController do
  use EmotionsWheelBackend.Web, :controller

  alias EmotionsWheelBackend.{Repo, Photo}

  def index(conn, _params) do
    photos = Photo |> Repo.all

    thumbs = Enum.map(photos, fn(photo) ->
      url = EmotionsWheelBackend.PhotoFileDefinition.url({ photo.file, photo }, :thumb)
      %{photo | url: "/" <> url}
    end)

    render(conn, "index.json", photos: thumbs)
  end

  def create(conn, %{"photo" => photo_params}) do
    changeset = Photo.changeset(%Photo{}, photo_params)

    if changeset.valid? do
      photo = Repo.insert!(changeset)

      conn
      |> put_status(:created)
      |> render("success.json", photo: photo)
    else

      conn
      |> put_status(:unprocessable_entity)
      |> render("error.json", changeset: changeset)
    end
  end
end
