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

alias EmotionsWheelBackend.{Researcher, Repo}

# Researchers
Repo.insert!(
  Researcher.changeset(
    %Researcher{}, %{
    email: "test@mail.com",
    password: "password",
    password_confirmation: "password",
    first_name: "John",
    last_name: "Doe",
    phone: "123123123"
  })
)
