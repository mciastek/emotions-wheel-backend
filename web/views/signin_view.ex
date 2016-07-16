defmodule EmotionsWheelBackend.SignInView do
  use EmotionsWheelBackend.Web, :view

  alias EmotionsWheelBackend.{ExperimentView}

  def render("success.json", %{experiment: experiment, participant: participant}) do
    experiment = experiment |> ExperimentView.render_one_only_photos

    %{experiment: experiment, participant: participant}
  end

  def render("error.json", %{message: message}) do
    %{message: message}
  end
end
