defmodule EmotionsWheelBackend.Rate do
  use EmotionsWheelBackend.Web, :model

  alias EmotionsWheelBackend.{Participant, Experiment, Photo}

  schema "rates" do
    field :name, :string
    field :pos_x, :decimal
    field :pos_y, :decimal
    field :start_time, Ecto.DateTime
    field :end_time, Ecto.DateTime
    field :time, :integer
    timestamps

    belongs_to :participant, Participant
    belongs_to :experiment, Experiment

    has_one :photo, Photo
  end

  @required_fields ~w(name pos_x pos_y start_time end_time)
  @optional_fields ~w(time)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> validate_number(:pos_x, greater_than_or_equal_to: Decimal.new(0), less_than_or_equal_to: Decimal.new(1))
    |> validate_number(:pos_y, greater_than_or_equal_to: Decimal.new(0), less_than_or_equal_to: Decimal.new(1))
  end
end
