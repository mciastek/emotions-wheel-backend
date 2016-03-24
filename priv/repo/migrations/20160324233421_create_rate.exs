defmodule EmotionsWheelBackend.Repo.Migrations.CreateRate do
  use Ecto.Migration

  def change do
    create table(:rates) do
      add :name, :string
      add :pos_x, :decimal
      add :pos_y, :decimal
      add :start_date, :datetime
      add :end_date, :datetime
      add :time, :integer
      timestamps
    end

  end
end
