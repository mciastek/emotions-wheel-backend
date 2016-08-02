defmodule EmotionsWheelBackend.SignInView do
  use EmotionsWheelBackend.Web, :view

  alias EmotionsWheelBackend.{ExperimentView, ParticipantView}

  @attributes_experiment ~w(id name kind start_date end_date researcher photos is_active has_completed)a

  def render("success.json", %{experiment: experiment, participant: participant}) do
    experiment = experiment
      |> ExperimentView.render_one_photos_researcher(@attributes_experiment)

    participant = participant
      |> ParticipantView.render_one_with_language

    %{experiment: experiment, participant: participant}
  end

  def render("error.json", %{message: message}) do
    %{message: message}
  end
end
