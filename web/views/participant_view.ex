defmodule EmotionsWheelBackend.ParticipantView do
  use EmotionsWheelBackend.Web, :view

  @attributes ~w(id email first_name last_name birthdate age gender experiment_uuid language_id country_id city_id)a
  @attributes_single_language ~w(id email first_name last_name birthdate age gender language)a

  def render("index.json", %{participants: participants}) do
    %{participants: participants |> render_many}
  end

  def render("show.json", %{participant: participant}) do
    %{participant: participant |> render_one}
  end

  def render("success.json", %{participant: participant}) do
    %{participant: participant |> render_one}
  end

  def render("error.json", %{message: message}) do
    %{message: message}
  end

  def render("error.json", %{changeset: changeset}) do
    %{changeset: changeset}
  end

  def render_many(participants) do
    participants |> Enum.map(&Map.take(&1, @attributes))
  end

  def render_one(participant) do
    participant |> Map.take(@attributes)
  end

  def render_one_with_language(participant) do
    participant |> Map.take(@attributes_single_language)
  end
end
