defmodule EmotionsWheelBackend.LanguageView do
  use EmotionsWheelBackend.Web, :view

  def render("index.json", %{languages: languages}) do
    %{languages: languages}
  end

  def render("show.json", %{language: language}) do
    %{language: language}
  end

  def render("success.json", %{language: language}) do
    %{language: language}
  end

  def render("error.json", %{message: message}) do
    %{message: message}
  end
end
