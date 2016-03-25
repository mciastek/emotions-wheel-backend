defmodule EmotionsWheelBackend.Repo.Migrations.AddRelationships do
  use Ecto.Migration

  def change do
    alter table(:experiments) do
      add :researcher_id, references(:researchers)
    end

    alter table(:photos) do
      add :rate_id, references(:rates)
    end

    alter table(:rates) do
      add :participant_id, references(:participants)
      add :experiment_id, references(:experiments)
    end

    alter table(:participants) do
      add :country_id, references(:countries)
      add :city_id, references(:cities)
      add :language_id, references(:languages)
    end

    alter table(:cities) do
      add :country_id, references(:countries)
    end

  end
end
