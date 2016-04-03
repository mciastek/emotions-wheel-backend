defmodule EmotionsWheelBackend.SessionController do
  use EmotionsWheelBackend.Web, :controller

  plug :scrub_params, "session" when action in [:create]

  def create(conn, %{"session" => session_params}) do
    case EmotionsWheelBackend.Session.authenticate(session_params) do
      {:ok, user} ->
        {:ok, token, _full_claims} = user |> Guardian.encode_and_sign(:token)

        conn
        |> put_status(:created)
        |> render("show.json", token: token, user: user)

      :error ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json")
    end
  end

  def delete(conn, _) do
    {:ok, claims} = Guardian.Plug.claims(conn)

    conn
    |> Guardian.Plug.current_token
    |> Guardian.revoke!(claims)

    # conn |> Guardian.Plug.sign_out

    conn
    |> render("delete.json")
  end

  def unauthenticated(conn, _params) do
    conn
    |> put_status(:forbidden)
    |> render(EmotionsWheelBackend.SessionView, "forbidden.json")
  end
end
