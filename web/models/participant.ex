defmodule EmotionsWheelBackend.Participant do
  use EmotionsWheelBackend.Web, :model
  use Timex

  alias EmotionsWheelBackend.{Country, City, Language, Rate, ExperimentsHasParticipants}

  @derive {Poison.Encoder, only: [
    :id,
    :email,
    :first_name,
    :last_name,
    :birthdate,
    :age,
    :gender,
    :language_id,
    :country_id,
    :city_id
  ]}

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

  @required_fields ~w(first_name last_name birthdate gender)
  @optional_fields ~w(email age)
  @gender_valid ~w(male female)

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
    |> validate_inclusion(:gender, @gender_valid, message: "Should be male or female")
    |> set_age
  end

  defp set_age(changeset) do
    age = get_change(changeset, :age)
    birthdate = get_change(changeset, :birthdate)

    cond do
      !age and birthdate ->
        birthdate_date = birthdate |> converted_birthdate
        date_diff = Date.diff(Date.now, birthdate_date, :years)

        changeset
        |> put_change(:age, date_diff)
      !age and !birthdate ->
        changeset
      true ->
        changeset
    end
  end

  defp converted_birthdate(birthdate) do
    birthdate
    |> Ecto.DateTime.to_erl
    |> Date.from
  end
end
