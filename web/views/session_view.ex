defmodule EmotionsWheelBackend.SessionView do
  use EmotionsWheelBackend.Web, :view

  def render("show.json", %{token: token, user: user}) do
    %{token: token, user: user}
  end

  def render("error.json", _) do
    %{error: "Invalid email or password!"}
  end

  def render("delete.json", _) do
    %{message: "Signed out successfully"}
  end

  def render("forbidden.json", %{error: error}) do
    %{error: "Not Authenticated"}
  end
end
