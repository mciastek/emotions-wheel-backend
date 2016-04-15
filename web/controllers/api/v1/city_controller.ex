defmodule EmotionsWheelBackend.CityController do
  use EmotionsWheelBackend.Web, :controller

  alias EmotionsWheelBackend.{Repo, City}

  def index(conn, _params) do
    cities = City |> Repo.all
    render(conn, "index.json", cities: cities)
  end

  def show(conn, %{"id" => id}) do
    city = City |> Repo.get_by(id: id)

    case city do
      nil ->
        conn
        |> put_status(:not_found)
        |> render("error.json", message: "Couldn't find matching city")
      _ -> render(conn, "show.json", city: city)
    end
  end
end
