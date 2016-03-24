defmodule EmotionsWheelBackend.Repo.Migrations.CreateLanguage do
  use Ecto.Migration

  def change do
    create table(:languages) do
      add :name, :string
      add :code, :string
      timestamps
    end

  end
end
