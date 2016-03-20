ExUnit.start

Mix.Task.run "ecto.create", ~w(-r EmotionsWheelBackend.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r EmotionsWheelBackend.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(EmotionsWheelBackend.Repo)

