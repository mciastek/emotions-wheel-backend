defmodule EmotionsWheelBackend.ParticipantTest do
  use EmotionsWheelBackend.ModelCase
  # use Timex

  alias EmotionsWheelBackend.Participant

  @valid_attrs %{
    email: "jon@doe.com",
    first_name: "John",
    last_name: "Doe",
    age: 20,
    gender: "male"
  }
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Participant.changeset(%Participant{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Participant.changeset(%Participant{}, @invalid_attrs)
    refute changeset.valid?
  end
end
