defmodule EmotionsWheelBackend.ExperimentView do
  use EmotionsWheelBackend.Web, :view

  def render("index.json", %{experiments: experiments}) do
    %{experiments: experiments}
  end

  def render("show.json", %{experiment: experiment}) do
    %{experiment: experiment}
  end

  def render("success.json", %{experiment: experiment}) do
    %{experiment: experiment}
  end

  def render("error.json", %{message: message}) do
    %{message: message}
  end

  def render("error.json", %{changeset: changeset}) do
    %{changeset: changeset}
  end
end
