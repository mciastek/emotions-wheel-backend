defmodule EmotionsWheelBackend.RateView do
  @attributes_index ~w(id name pos_x pos_y time start_time end_time participant_id experiment_id photo_id)a

  def render("index.json", %{rates: rates}) do
    %{rates: rates |> render_many}
  end

  def render("deleted.json", %{deleted_number: deleted_number}) do
    %{deleted_number: deleted_number}
  end

  def render("error.json", %{changeset: changeset}) do
    errors = Enum.map(changeset.errors, fn{field, details} ->
      %{
        type: field,
        message: details
      }
    end)

    %{errors: errors}
  end

  def render_many(rates) do
    rates |> Enum.map(&Map.take(&1, @attributes_index))
  end
end
