defmodule EmotionsWheelBackend.ParticipantTest do
  use EmotionsWheelBackend.ModelCase
  use Timex

  alias EmotionsWheelBackend.Participant

  @valid_attrs %{
    email: "jon@doe.com",
    first_name: "John",
    last_name: "Doe",
    age: 20,
    gender: "male",
    birthdate: Convertable.to_erlang_datetime(DateTime.now)
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

  test "should throw error when invalid gender" do
    changeset = Participant.changeset(%Participant{}, %{
      email: "jon@doe.com",
      first_name: "John",
      last_name: "Doe",
      age: 20,
      gender: "none",
      birthdate: Convertable.to_erlang_datetime(DateTime.now)
    })
    refute changeset.valid?
  end

  test "should set age from birthdate" do
    changeset = Participant.changeset(%Participant{}, %{
      email: "jon@doe.com",
      first_name: "John",
      last_name: "Doe",
      gender: "none",
      birthdate: Convertable.to_erlang_datetime(%Date{year: 1945, month: 01, day: 05})
    })

    age = get_field(changeset, :age)

    assert age
  end
end
