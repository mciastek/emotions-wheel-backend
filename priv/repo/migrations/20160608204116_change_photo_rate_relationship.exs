defmodule EmotionsWheelBackend.Repo.Migrations.ChangePhotoRateRelationship do
  use Ecto.Migration

  def change do
    alter table(:photos) do
      remove :rate_id
    end

    alter table(:rates) do
      add :photo_id, references(:photos)
    end
  end
end
