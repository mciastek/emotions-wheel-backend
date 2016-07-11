defmodule EmotionsWheelBackend.SignInView do
  use EmotionsWheelBackend.Web, :view

  def render("success.json", %{experiment: experiment, participant: participant}) do
    %{experiment: experiment, participant: participant}
  end

  def render("error.json", %{message: message}) do
    %{message: message}
  end
end
