defmodule EmotionsWheelBackend.Rate do
  use EmotionsWheelBackend.Web, :model

  schema "rates" do
    field :name, :string
    field :pos_x, :decimal
    field :pos_y, :decimal
    field :start_date, Ecto.DateTime
    field :end_date, Ecto.DateTime
    field :time, :integer
    timestamps
  end

  @required_fields ~w(name pos_x pos_y)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
