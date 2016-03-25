defmodule EmotionsWheelBackend.City do
  use EmotionsWheelBackend.Web, :model

  schema "cities" do
    field :name, :string
    timestamps

    belongs_to :countries, Country

    has_many :participants, Participant
  end

  @required_fields ~w(name)
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
