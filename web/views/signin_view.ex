defmodule EmotionsWheelBackend.SignInView do
  use EmotionsWheelBackend.Web, :view

  alias EmotionsWheelBackend.{ExperimentView, ParticipantView}

  def render("success.json", %{experiment: experiment, participant: participant}) do
    experiment = experiment |> ExperimentView.render_one_photos_researcher
    participant = participant |> ParticipantView.render_one_with_language

    %{experiment: experiment, participant: participant}
  end

  def render("error.json", %{message: message}) do
    %{message: message}
  end
end
