defmodule EmotionsWheelBackend.ResearcherTest do
  use EmotionsWheelBackend.ModelCase

  alias EmotionsWheelBackend.Researcher

  @valid_attrs %{
    email: "researcher@mail.com",
    encrypted_password: "secret",
    password: "password",
    password_confirmation: "password",
    first_name: "Jon",
    last_name: "Doe",
    phone: "123123123"
  }

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
