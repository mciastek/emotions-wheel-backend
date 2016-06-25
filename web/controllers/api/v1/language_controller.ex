defmodule EmotionsWheelBackend.LanguageController do
  use EmotionsWheelBackend.Web, :controller

  alias EmotionsWheelBackend.{Repo, Language}

  def index(conn, _params) do
    languages = Language |> Repo.all
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

  def delete(conn, %{"id" => id}) do
    language = Language |> Repo.get!(id)

    case Repo.delete(language) do
      {:ok, _} ->
        languages = Language |> Repo.all
        render(conn, "index.json", languages: languages)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json", changeset: changeset)
    end
  end
end
