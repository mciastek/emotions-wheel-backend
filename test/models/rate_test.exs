defmodule EmotionsWheelBackend.RateTest do
  use EmotionsWheelBackend.ModelCase
  use Timex

  alias EmotionsWheelBackend.Rate

  @valid_attrs %{
    name: "Rate 1",
    pos_x: 0.25,
    pos_y: 0.577,
    start_time: Convertable.to_erlang_datetime(DateTime.now),
    end_time: Convertable.to_erlang_datetime(DateTime.now),
    time: 1232133
  }
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Rate.changeset(%Rate{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Rate.changeset(%Rate{}, @invalid_attrs)
    refute changeset.valid?
  end
end
