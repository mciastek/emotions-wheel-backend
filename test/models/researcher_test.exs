defmodule EmotionsWheelBackend.ResearcherTest do
  use EmotionsWheelBackend.ModelCase

  alias EmotionsWheelBackend.Researcher

  @valid_attrs %{
    email: "researcher@mail.com",
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

  test "encrypted_password value gets set to a hash" do
    changeset = Researcher.changeset(%Researcher{}, @valid_attrs)
    assert Comeonin.Bcrypt.checkpw(@valid_attrs.password, Ecto.Changeset.get_change(changeset, :encrypted_password))
  end

  test "encrypted_password value does not get set if password is nil" do
    changeset = Researcher.changeset(%Researcher{}, %{
      email: "researcher@mail.com",
      password: nil,
      password_confirmation: nil,
      first_name: "Jon",
      last_name: "Doe",
      phone: "123123123"
    })
    refute Ecto.Changeset.get_change(changeset, :encrypted_password)
  end
end
