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

    belongs_to :country, Country
    belongs_to :city, City
    belongs_to :language, Language

    has_many :rates, Rate
    has_many :experiments_has_participants, ExperimentsHasParticipants
    has_many :experiments, through: [:experiments_has_participants, :experiments]
  end

  @required_fields ~w(first_name last_name age gender)
  @optional_fields ~w(email birthdate)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> validate_format(:email, ~r/@/)
    |> unique_constraint(:email, message: "E-mail already taken!")
    |> validate_gender
  end

  defp validate_gender(changeset) do
    value = get_field(changeset, :gender)
    if (value == "male" or value == "female") do
      changeset
    else
      changeset |> add_error(:gender, "should be male or female")
    end
  end
end
