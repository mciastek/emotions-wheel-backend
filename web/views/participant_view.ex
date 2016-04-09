defmodule EmotionsWheelBackend.ParticipantView do
  use EmotionsWheelBackend.Web, :view

  def render("index.json", %{participants: participants}) do
    %{participants: participants}
  end

  def render("show.json", %{participant: participant}) do
    %{participant: participant}
  end

  def render("error.json", %{message: message}) do
    %{message: message}
  end
end
