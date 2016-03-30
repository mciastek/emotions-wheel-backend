defmodule EmotionsWheelBackend.ResearcherController do
  use EmotionsWheelBackend.Web, :controller

  alias EmotionsWheelBackend.{Repo, Researcher}

  def index(conn, _params) do

    researchers = Researcher |> Repo.all

    json conn, %{researchers: researchers}
  end
end
