defmodule EmotionsWheelBackend.RateView do
  @attributes_index ~w(id name pos_x pos_y time start_date end_date participant_id experiment_id photo_id)a

  def render("index.json", %{rates: rates}) do
    %{rates: rates |> render_many}
  end

  def render_many(rates) do
    rates |> Enum.map(&Map.take(&1, @attributes_index))
  end
end
