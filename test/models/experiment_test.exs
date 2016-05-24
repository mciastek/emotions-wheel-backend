defmodule EmotionsWheelBackend.ExperimentTest do
  use EmotionsWheelBackend.ModelCase
  use Timex

  alias EmotionsWheelBackend.Experiment

  end_date = Timex.shift(DateTime.now, days: 1)

  @valid_attrs %{
    name: "Experiment 2",
    kind: "free_mode",
    start_date: Convertable.to_erlang_datetime(DateTime.now),
    end_date: Convertable.to_erlang_datetime(end_date)
  }
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Experiment.changeset(%Experiment{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Experiment.changeset(%Experiment{}, @invalid_attrs)
    refute changeset.valid?
  end

  test "should invalid changeset when end_date is lower than start_date" do
    changeset = Experiment.changeset(%Experiment{}, %{
      name: "Experiment 3",
      kind: "experiment",
      start_date: Ecto.DateTime.cast!({{2016, 04, 23}, {11, 00, 00}}),
      end_date: Ecto.DateTime.cast!({{2016, 04, 23}, {10, 00, 00}})
    })

    assert changeset.errors[:end_date]
  end

  test "should invalid changeset when end_date is lower present date" do
    changeset = Experiment.changeset(%Experiment{}, %{
      name: "Experiment 4",
      kind: "experiment",
      start_date: Ecto.DateTime.cast!({{2016, 04, 23}, {09, 00, 00}}),
      end_date: Ecto.DateTime.cast!({{2016, 04, 23}, {10, 00, 00}})
    })

    assert changeset.errors[:ended]
  end
end
