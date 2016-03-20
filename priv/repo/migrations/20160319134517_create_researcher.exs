defmodule EmotionsWheelBackend.Repo.Migrations.CreateResearcher do
  use Ecto.Migration

  def change do
    create table(:researchers) do
      add :login, :string
      add :encrypted_password, :string
      add :first_name, :string
      add :last_name, :string
      add :email, :string
      add :phone, :string
      timestamps
    end

  end
end
