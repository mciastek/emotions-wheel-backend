defmodule EmotionsWheelBackend.Repo.Migrations.CreateResearcher do
  use Ecto.Migration

  def change do
    create table(:researchers) do
      add :email, :string
      add :encrypted_password, :string
      add :first_name, :string
      add :last_name, :string
      add :phone, :string
      timestamps
    end

    create unique_index(:researchers, [:email])
  end
end
