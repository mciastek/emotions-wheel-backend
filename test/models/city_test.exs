defmodule EmotionsWheelBackend.CityTest do
  use EmotionsWheelBackend.ModelCase

  alias EmotionsWheelBackend.City

  @valid_attrs %{name: "Warsaw"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = City.changeset(%City{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = City.changeset(%City{}, @invalid_attrs)
    refute changeset.valid?
  end
end
