defmodule EmotionsWheelBackend.ExperimentsHasPhotosTest do
  use EmotionsWheelBackend.ModelCase

  alias EmotionsWheelBackend.ExperimentsHasPhotos

  @valid_attrs %{}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = ExperimentsHasPhotos.changeset(%ExperimentsHasPhotos{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = ExperimentsHasPhotos.changeset(%ExperimentsHasPhotos{}, @invalid_attrs)
    refute changeset.valid?
  end
end
