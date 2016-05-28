defmodule EmotionsWheelBackend.PhotoController do
  use EmotionsWheelBackend.Web, :controller

  alias EmotionsWheelBackend.{Repo, Photo}

  def index(conn, _params) do
    photos = Photo |> Repo.all
    render(conn, "index.json", photos: photos)
  end
end
