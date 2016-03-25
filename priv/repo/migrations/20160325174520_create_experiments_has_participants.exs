defmodule EmotionsWheelBackend.Repo.Migrations.CreateExperimentsHasParticipants do
  use Ecto.Migration

  def change do
    create table(:experiments_has_participants) do
      add :uuid, :uuid
      add :participant_id, references(:participants)
      add :experiment_id, references(:experiments)
      timestamps
    end

  end
end
