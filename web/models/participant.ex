defmodule EmotionsWheelBackend.Participant do
  use EmotionsWheelBackend.Web, :model

  schema "participants" do
    field :email, :string
    field :first_name, :string
    field :last_name, :string
    field :birthdate, Ecto.DateTime
    field :age, :integer
    field :gender, :string
    timestamps
  end

  @required_fields ~w(first_name last_name birthdate age gender)
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