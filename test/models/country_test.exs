defmodule EmotionsWheelBackend.CountryTest do
  use EmotionsWheelBackend.ModelCase

  alias EmotionsWheelBackend.Country

  @valid_attrs %{name: "Poland"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Country.changeset(%Country{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Country.changeset(%Country{}, @invalid_attrs)
    refute changeset.valid?
  end
end
