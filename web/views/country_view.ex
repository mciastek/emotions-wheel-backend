defmodule EmotionsWheelBackend.CountryView do
  use EmotionsWheelBackend.Web, :view

  def render("index.json", %{countries: countries}) do
    %{countries: countries}
  end

  def render("show.json", %{country: country}) do
    %{country: country}
  end

  def render("success.json", %{country: country}) do
    %{country: country}
  end

  def render("error.json", %{message: message}) do
    %{message: message}
  end
end
