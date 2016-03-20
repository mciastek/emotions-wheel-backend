defmodule EmotionsWheelBackend.Repo.Migrations.CreateExperiment do
  use Ecto.Migration

  def change do
    create table(:experiments) do
      add :name, :string
      add :kind, :string
      add :start_date, :datetime
      add :end_date, :datetime
      timestamps
    end

  end
end
