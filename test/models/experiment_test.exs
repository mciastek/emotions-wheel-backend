defmodule EmotionsWheelBackend.ExperimentTest do
  use EmotionsWheelBackend.ModelCase
  use Timex

  alias EmotionsWheelBackend.Experiment

  @valid_attrs %{name: "Experiment 2", kind: "free play", start_date: DateTime.today, end_date: DateTime.today}
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
