defmodule EmotionsWheelBackend.StatsView do
  use EmotionsWheelBackend.Web, :view

  def render("index.json", %{stats: stats}) do
    %{stats: stats}
  end
end
