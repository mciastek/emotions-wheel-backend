defmodule EmotionsWheelBackend.SessionController do
  use EmotionsWheelBackend.Web, :controller

  plug :scrub_params, "session" when action in [:create]

  def create(conn, %{"session" => session_params}) do
    case EmotionsWheelBackend.Session.authenticate(session_params) do
      {:ok, user} ->
        {:ok, token, _full_claims} = user |> Guardian.encode_and_sign(:token)

        conn
        |> put_status(:created)
        |> render("show.json", token: token, user_id: user.id)

      :error ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json")
    end
  end

  def delete(conn, _) do
    case Guardian.Plug.claims(conn) do
      {:ok, claims} ->
        conn
        |> Guardian.Plug.current_token
        |> Guardian.revoke!(claims)

        conn
        |> render("delete.json")
      {:error, reason} ->
        IO.puts "Session error, reason: #{reason}"

        conn
        |> render("delete.json")
    end
  end

  def unauthenticated(conn, _params) do
    conn
    |> put_status(:forbidden)
    |> render(EmotionsWheelBackend.SessionView, "forbidden.json")
  end
end
