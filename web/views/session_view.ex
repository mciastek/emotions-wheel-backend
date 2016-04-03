defmodule EmotionsWheelBackend.SessionView do
  use EmotionsWheelBackend.Web, :view

  def render("show.json", %{token: token, user_id: user_id}) do
    %{token: token, user_id: user_id}
  end

  def render("error.json", _) do
    %{message: "Invalid email or password!"}
  end

  def render("delete.json", _) do
    %{message: "Signed out successfully"}
  end

  def render("forbidden.json", _) do
    %{message: "Not Authenticated"}
  end
end
