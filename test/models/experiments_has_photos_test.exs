defmodule EmotionsWheelBackend.ExperimentsHasPhotosTest do
  use EmotionsWheelBackend.ModelCase

  alias EmotionsWheelBackend.ExperimentsHasPhotos

  @valid_attrs %{
    experiment_id: 1,
    photo_id: 1
  }

  test "changeset with valid attributes" do
    changeset = ExperimentsHasPhotos.changeset(%ExperimentsHasPhotos{}, @valid_attrs)
    assert changeset.valid?
  end
end
