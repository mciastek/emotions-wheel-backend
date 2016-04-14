defmodule EmotionsWheelBackend.LanguageController do
  use EmotionsWheelBackend.Web, :controller

  alias EmotionsWheelBackend.{Repo, Language}

  def index(conn, _params) do
    languages = Language |> Repo.all
    IO.inspect languages
    render(conn, "index.json", languages: languages)
  end

  def show(conn, %{"id" => id}) do
    language = Language |> Repo.get_by(id: id)

    case language do
      nil ->
        conn
        |> put_status(:not_found)
        |> render("error.json", message: "Couldn't find matching language")
      _ -> render(conn, "show.json", language: language)
    end
  end
end
