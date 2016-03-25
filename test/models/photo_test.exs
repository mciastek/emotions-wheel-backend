defmodule EmotionsWheelBackend.PhotoTest do
  use EmotionsWheelBackend.ModelCase

  alias EmotionsWheelBackend.Photo

  @valid_attrs %{name: "photo_1", url: "url/to/photo_1.jpg", author_type: "participant", author_id: 1}
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
