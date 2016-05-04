defmodule EmotionsWheelBackend.ExperimentTest do
  use EmotionsWheelBackend.ModelCase
  use Timex

  alias EmotionsWheelBackend.Experiment

  @valid_attrs %{
    name: "Experiment 2",
    kind: "free_mode",
    start_date: Convertable.to_erlang_datetime(DateTime.now),
    end_date: Convertable.to_erlang_datetime(DateTime.now)
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
end
