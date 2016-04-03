defmodule EmotionsWheelBackend.ResearcherController do
  use EmotionsWheelBackend.Web, :controller

  alias EmotionsWheelBackend.{Repo, Researcher}

  def index(conn, _params) do

    researchers = Researcher |> Repo.all

    render(conn, "index.json", researchers: researchers)
  end

  def show(conn, %{"id" => id}) do
    researcher = Researcher |> Repo.get_by(id: id)

    case researcher do
      nil -> render(conn, "error.json", message: "Couldn't find matching researcher")
      _ -> render(conn, "show.json", researcher: researcher)
    end
  end
end
