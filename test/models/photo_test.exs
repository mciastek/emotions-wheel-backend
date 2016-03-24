defmodule EmotionsWheelBackend.PhotoTest do
  use EmotionsWheelBackend.ModelCase

  alias EmotionsWheelBackend.Photo

  @valid_attrs %{}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Photo.changeset(%Photo{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Photo.changeset(%Photo{}, @invalid_attrs)
    refute changeset.valid?
  end
end
