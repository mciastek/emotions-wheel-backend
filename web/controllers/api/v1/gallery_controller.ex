defmodule EmotionsWheelBackend.GalleryController do
  use EmotionsWheelBackend.Web, :controller

  alias EmotionsWheelBackend.{Repo, Photo}

  def index(conn, %{"id" => participant_id}) do
    photos = participant_id |> Photo.by_participant |> Repo.all

    conn
    |> render("index.json", photos: photos)
  end

  def create_photo(conn, %{"id" => participant_id ,"photo" => photo_params}) do
    changeset = Photo.changeset(%Photo{}, photo_params)

    case Repo.insert(changeset) do
      {:ok, _} ->
        photos = participant_id |> Photo.by_participant |> Repo.all

        conn
        |> put_status(:created)
        |> render("success.json", photos: photos)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json", changeset: changeset)
    end
  end
end
