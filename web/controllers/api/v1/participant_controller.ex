defmodule EmotionsWheelBackend.ParticipantController do
  use EmotionsWheelBackend.Web, :controller

  alias EmotionsWheelBackend.{Repo, Participant, ExperimentsHasParticipants}

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

  def create(conn, %{"participant" => participant_params}) do
    changeset = Participant.changeset(%Participant{}, participant_params)

    case Repo.insert(changeset) do
      {:ok, participant} ->
        conn
        |> put_status(:created)
        |> render("success.json", participant: participant)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json", changeset: changeset)
    end
  end

  def update(conn, %{"id" => id, "participant" => participant_params}) do
    participant = Repo.get!(Participant, id)

    changeset = Participant.changeset(participant, participant_params)

    case Repo.update(changeset) do
      {:ok, participant} ->
          conn
          |> render("success.json", participant: participant)
      {:error, changeset} ->
          conn
          |> put_status(:unprocessable_entity)
          |> render("error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    participant = Repo.get!(Participant, id)

    case Repo.delete(participant) do
      {:ok, _} ->
        participants = Participant |> Repo.all
        render(conn, "index.json", participants: participants)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json", changeset: changeset)
    end
  end

  def get_free_participants(conn, _params) do
    query = from p in Participant,
      left_join: ehp in assoc(p, :experiments_has_participants),
      left_join: e in assoc(ehp, :experiment),
      where: e.end_date < ^Ecto.DateTime.utc or is_nil(ehp.participant_id),
      select: p

    participants = query |> Repo.all

    render(conn, "index.json", participants: participants)
  end
end
