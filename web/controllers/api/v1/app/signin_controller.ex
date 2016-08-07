defmodule EmotionsWheelBackend.SignInController do
  use EmotionsWheelBackend.Web, :controller

  alias EmotionsWheelBackend.{ParticipantAuth}

  def create(conn, params) do
    case ParticipantAuth.authenticate(params) do
      {:ok, experiment, participant} ->
        conn
        |> render("success.json", experiment: experiment, participant: participant)
      {:error, error} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json", error: error)
    end
  end
end
