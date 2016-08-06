defmodule EmotionsWheelBackend.GalleryController do
  use EmotionsWheelBackend.Web, :controller

  alias EmotionsWheelBackend.{Repo, Photo}

  def index(conn, %{"id" => participant_id}) do
    photos = participant_id |> Photo.by_participant |> Repo.all

    conn
    |> render("index.json", photos: photos)
  end
end
