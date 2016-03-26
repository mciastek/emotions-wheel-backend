# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     EmotionsWheelBackend.Repo.insert!(%EmotionsWheelBackend.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias EmotionsWheelBackend.{Researcher, Participant, Repo}

# Researchers
Researcher.changeset(
  %Researcher{}, %{
    email: "test@mail.com",
    password: "password",
    password_confirmation: "password",
    first_name: "John",
    last_name: "Doe",
    phone: "123123123"
}) |> Repo.insert!

# Participants
Participant.changeset(
  %Participant{}, %{
    email: "participant@test.com",
    first_name: "Will",
    last_name: "Smith",
    birthdate: {{1941, 11, 30}, {0,0,0}},
    age: 75,
    gender: "male"
  }
) |> Repo.insert!

Participant.changeset(
  %Participant{}, %{
    email: "participant2@test.com",
    first_name: "Jane",
    last_name: "Fonda",
    birthdate: {{1945, 01, 03}, {0,0,0}},
    age: 71,
    gender: "female"
  }
) |> Repo.insert!
