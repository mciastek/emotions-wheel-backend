defmodule EmotionsWheelBackend.CountryController do
  use EmotionsWheelBackend.Web, :controller

  alias EmotionsWheelBackend.{Repo, Country}

  def index(conn, _params) do
    countries = Country |> Repo.all
    render(conn, "index.json", countries: countries)
  end

  def show(conn, %{"id" => id}) do
    country = Country |> Repo.get_by(id: id)

    case country do
      nil ->
        conn
        |> put_status(:not_found)
        |> render("error.json", message: "Couldn't find matching country")
      _ -> render(conn, "show.json", country: country)
    end
  end
end
