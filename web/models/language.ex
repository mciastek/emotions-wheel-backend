defmodule EmotionsWheelBackend.Language do
  use EmotionsWheelBackend.Web, :model

  alias EmotionsWheelBackend.{Participant}

  schema "languages" do
    field :name, :string
    field :code, :string
    timestamps

    has_many :participants, Participant
  end

  @required_fields ~w(code)
  @optional_fields ~w(name)

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
