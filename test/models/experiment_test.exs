defmodule EmotionsWheelBackend.ExperimentTest do
  use EmotionsWheelBackend.ModelCase

  alias EmotionsWheelBackend.Experiment

  @valid_attrs %{}
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
