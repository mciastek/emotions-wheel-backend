defmodule EmotionsWheelBackend.CityView do
  use EmotionsWheelBackend.Web, :view

  def render("index.json", %{cities: cities}) do
    %{cities: cities}
  end

  def render("show.json", %{city: city}) do
    %{city: city}
  end

  def render("success.json", %{city: city}) do
    %{city: city}
  end

  def render("error.json", %{message: message}) do
    %{message: message}
  end
end
