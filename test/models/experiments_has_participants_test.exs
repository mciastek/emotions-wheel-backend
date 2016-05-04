defmodule EmotionsWheelBackend.ExperimentsHasParticipantsTest do
  use EmotionsWheelBackend.ModelCase

  alias EmotionsWheelBackend.ExperimentsHasParticipants

  @valid_attrs %{
    experiment_id: 1,
    participant_id: 2
  }
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = ExperimentsHasParticipants.changeset(%ExperimentsHasParticipants{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = ExperimentsHasParticipants.changeset(%ExperimentsHasParticipants{}, @invalid_attrs)
    refute changeset.valid?
  end

  test "it generates UUID after changeset" do
    changeset = ExperimentsHasParticipants.changeset(%ExperimentsHasParticipants{}, @valid_attrs)
    uuid = changeset |> get_field(:uuid)
    assert !is_nil(uuid)
  end

  test "it should not generate UUID when it's present" do
    uuid = "082eb4f7-1020-40a9-a33a-76b6b0bbe52d"
    changeset = ExperimentsHasParticipants.changeset(%ExperimentsHasParticipants{}, %{
      experiment_id: 1,
      participant_id: 2,
      uuid: uuid
    })

    assert changeset |> get_field(:uuid) == uuid
  end
end
