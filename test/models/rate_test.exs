defmodule EmotionsWheelBackend.RateTest do
  use EmotionsWheelBackend.ModelCase

  alias EmotionsWheelBackend.Rate

  @valid_attrs %{}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Rate.changeset(%Rate{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Rate.changeset(%Rate{}, @invalid_attrs)
    refute changeset.valid?
  end
end
