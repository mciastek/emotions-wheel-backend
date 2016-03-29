defmodule EmotionsWheelBackend.Repo.Migrations.ParticipantsSetUniqueEmail do
  use Ecto.Migration

  def change do
    create unique_index(:participants, [:email])
  end
end
