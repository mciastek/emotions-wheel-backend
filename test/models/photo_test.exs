defmodule EmotionsWheelBackend.PhotoTest do
  use EmotionsWheelBackend.ModelCase

  alias EmotionsWheelBackend.{Photo, PhotoFileDefinition}

  import Mock

  @valid_attrs %{
    name: "photo_1",
    author_type: "participant",
    url: "/path/to/my/file.png",
    author_id: 1
  }
  @invalid_attrs %{}

  test_with_mock "changeset with valid attributes", PhotoFileDefinition, [store: fn({"/path/to/my/file.png", %Photo{}}) -> {:ok, "file.png"} end] do
    changeset = Photo.changeset(%Photo{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Photo.changeset(%Photo{}, @invalid_attrs)
    refute changeset.valid?
  end
end
