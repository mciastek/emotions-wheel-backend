defmodule EmotionsWheelBackend.Repo.Migrations.CreateParticipant do
  use Ecto.Migration

  def change do
    create table(:participants) do
      add :email, :string
      add :first_name, :string
      add :last_name, :string
      add :birthdate, :date
      add :age, :integer
      add :gender, :string
      timestamps
    end
  end
end
