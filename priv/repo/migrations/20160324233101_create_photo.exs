defmodule EmotionsWheelBackend.Repo.Migrations.CreatePhoto do
  use Ecto.Migration

  def change do
    create table(:photos) do
      add :name, :string
      add :url, :string
      add :author_type, :string
      add :author_id, :integer
      timestamps
    end

  end
end
