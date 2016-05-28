defmodule EmotionsWheelBackend.Repo.Migrations.PhotoRenameColumn do
  use Ecto.Migration

  def change do
    rename table(:photos), :url, to: :file
  end
end
