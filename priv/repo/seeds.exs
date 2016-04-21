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

alias EmotionsWheelBackend.{Researcher, Participant, Country, City, Language, Repo}

# Researchers
researchers = [
  %{
    email: "test@mail.com",
    password: "password",
    password_confirmation: "password",
    first_name: "John",
    last_name: "Doe",
    phone: "123123123"
  }
]

# Participants
participants = [
  %{
    email: "participant@test.com",
    first_name: "Jerzy",
    last_name: "Stuhr",
    birthdate: {1941, 11, 30},
    age: 75,
    gender: "male"
  },
  %{
    email: "participant2@test.com",
    first_name: "Jane",
    last_name: "Fonda",
    birthdate: {1945, 10, 05},
    age: 71,
    gender: "female"
  }
]

# Countries
countries = [
  %{
    name: "Poland"
  },
  %{
    name: "England"
  }
]

# Languages
languages = [
  %{
    name: "Polish",
    code: "pl"
  },
  %{
    name: "English",
    code: "en"
  }
]

# Cities
cities = [
  %{
    name: "Warsaw"
  },
  %{
    name: "London"
  }
]

# Insert all repos
researchers |> Enum.each(fn(map) ->
  Researcher.changeset(%Researcher{}, map) |> Repo.insert!
end)

participants |> Enum.each(fn(map) ->
  Participant.changeset(%Participant{}, map) |> Repo.insert!
end)

languages |> Enum.each(fn(map) ->
  Language.changeset(%Language{}, map) |> Repo.insert!
end)

countries |> Enum.each(fn(map) ->
  Country.changeset(%Country{}, map) |> Repo.insert!
end)

cities |> Enum.each(fn(map) ->
  City.changeset(%City{}, map) |> Repo.insert!
end)


# Get certain records
participant_1 = Repo.get_by(Participant, email: "participant@test.com")
participant_2 = Repo.get_by(Participant, email: "participant2@test.com")

poland = Repo.get_by(Country, name: "Poland")
polish = Repo.get_by(Language, name: "Polish")
warsaw = Repo.get_by(City, name: "Warsaw")

england = Repo.get_by(Country, name: "England")
english = Repo.get_by(Language, name: "English")
london = Repo.get_by(City, name: "London")

# Set assocciations
Ecto.Changeset.change(warsaw, country_id: poland.id)
|> Repo.update!

Ecto.Changeset.change(london, country_id: england.id)
|> Repo.update!

Ecto.Changeset.change(participant_1, country_id: poland.id, city_id: warsaw.id, language_id: polish.id)
|> Repo.update!

Ecto.Changeset.change(participant_2, country_id: england.id, city_id: london.id, language_id: english.id)
|> Repo.update!

