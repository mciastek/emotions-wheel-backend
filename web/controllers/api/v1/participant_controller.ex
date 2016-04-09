defmodule EmotionsWheelBackend.ParticipantController do
  use EmotionsWheelBackend.Web, :controller

  alias EmotionsWheelBackend.{Repo, Participant}

  def index(conn, _params) do
    participants = Participant |> Repo.all
    render(conn, "index.json", participants: participants)
  end

  def show(conn, %{"id" => id}) do
    participant = Participant |> Repo.get_by(id: id)

    case participant do
      nil ->
        conn
        |> put_status(:not_found)
        |> render("error.json", message: "Couldn't find matching participant")
      _ -> render(conn, "show.json", participant: participant)
    end
  end
end
