defmodule EmotionsWheelBackend.ResearcherController do
  use EmotionsWheelBackend.Web, :controller

  alias EmotionsWheelBackend.{Repo, Researcher}

  def index(conn, _params) do

    researchers = Researcher |> Repo.all

    render(conn, "index.json", researchers: researchers)
  end
end
