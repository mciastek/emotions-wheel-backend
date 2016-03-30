defmodule EmotionsWheelBackend.ResearcherView do
  use EmotionsWheelBackend.Web, :view

  def render("index.json", %{researchers: researchers}) do
    %{researchers: researchers}
  end

  def render("error.json", %{changeset: changeset}) do

  end
end
