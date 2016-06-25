defmodule EmotionsWheelBackend.ParticipantController do
  use EmotionsWheelBackend.Web, :controller

  alias EmotionsWheelBackend.{Repo, Participant}

  def index(conn, _params) do
    participants = Participant |> Repo.all
    render(conn, "index.json", participants: participants)
  end

  def show(conn, %{"id" => id}) do
    participant_with_uuid = Participant.with_experiment_uuid |> Repo.get(id)

    case participant_with_uuid do
      nil ->
        participant = Participant |> Repo.get(id)

        case participant do
          nil ->
            conn
            |> put_status(:not_found)
            |> render("error.json", message: "Couldn't find matching participant")

          _ ->
            render(conn, "show.json", participant: participant)
        end

      {participant, uuid} ->
        render(conn, "show.json", participant: %{participant | experiment_uuid: uuid})
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
    participant = Participant |> Repo.get!(id)

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
    participants = Participant.without_experiment |> Repo.all

    render(conn, "index.json", participants: participants)
  end
end
