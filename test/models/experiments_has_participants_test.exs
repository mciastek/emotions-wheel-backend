defmodule EmotionsWheelBackend.ExperimentsHasParticipantsTest do
  use EmotionsWheelBackend.ModelCase

  alias EmotionsWheelBackend.ExperimentsHasParticipants

  @valid_attrs %{uuid: "5976423a-ee35-11e3-8569-14109ff1a304"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = ExperimentsHasParticipants.changeset(%ExperimentsHasParticipants{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = ExperimentsHasParticipants.changeset(%ExperimentsHasParticipants{}, @invalid_attrs)
    refute changeset.valid?
  end
end
