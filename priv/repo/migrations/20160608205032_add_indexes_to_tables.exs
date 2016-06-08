defmodule EmotionsWheelBackend.Repo.Migrations.AddIndexesToTables do
  use Ecto.Migration

  def change do
    create index(:rates, [:photo_id, :experiment_id, :participant_id])
    create index(:experiments_has_participants, [:uuid, :participant_id, :experiment_id])
    create index(:experiments_has_photos, [:photo_id, :experiment_id])
  end
end
