defmodule EmotionsWheelBackend.Repo.Migrations.AddOrderNoToPhotos do
  use Ecto.Migration

  def change do
    alter table(:experiments_has_photos) do
      add :order_no, :integer
    end
  end
end
