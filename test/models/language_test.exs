defmodule EmotionsWheelBackend.LanguageTest do
  use EmotionsWheelBackend.ModelCase

  alias EmotionsWheelBackend.Language

  @valid_attrs %{}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Language.changeset(%Language{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Language.changeset(%Language{}, @invalid_attrs)
    refute changeset.valid?
  end
end
