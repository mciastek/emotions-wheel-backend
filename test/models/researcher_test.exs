defmodule EmotionsWheelBackend.ResearcherTest do
  use EmotionsWheelBackend.ModelCase

  alias EmotionsWheelBackend.Researcher

  @valid_attrs %{}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Researcher.changeset(%Researcher{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Researcher.changeset(%Researcher{}, @invalid_attrs)
    refute changeset.valid?
  end
end
