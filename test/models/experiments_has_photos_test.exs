defmodule EmotionsWheelBackend.ExperimentsHasPhotosTest do
  use EmotionsWheelBackend.ModelCase

  alias EmotionsWheelBackend.ExperimentsHasPhotos

  @valid_attrs %{}

  test "changeset with valid attributes" do
    changeset = ExperimentsHasPhotos.changeset(%ExperimentsHasPhotos{}, @valid_attrs)
    assert changeset.valid?
  end
end
