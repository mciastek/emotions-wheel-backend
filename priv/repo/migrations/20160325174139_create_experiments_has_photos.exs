defmodule EmotionsWheelBackend.Repo.Migrations.CreateExperimentsHasPhotos do
  use Ecto.Migration

  def change do
    create table(:experiments_has_photos) do
      add :photo_id, references(:photos)
      add :experiment_id, references(:experiments)
      timestamps
    end

  end
end
