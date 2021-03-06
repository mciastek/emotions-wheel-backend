defmodule EmotionsWheelBackend.Participant do
  use EmotionsWheelBackend.Web, :model

  alias EmotionsWheelBackend.{Participant, Country, City, Language, Rate, ExperimentsHasParticipants}

  schema "participants" do
    field :email, :string
    field :first_name, :string
    field :last_name, :string
    field :birthdate, Ecto.Date
    field :age, :integer
    field :gender, :string
    field :experiment_uuid, :string, virtual: true
    timestamps

    belongs_to :country, Country
    belongs_to :city, City
    belongs_to :language, Language

    has_many :rates, Rate, on_delete: :delete_all
    has_many :experiments_has_participants, ExperimentsHasParticipants, on_delete: :delete_all
    has_many :experiments, through: [:experiments_has_participants, :experiments]
  end

  @required_fields ~w(first_name last_name birthdate gender)
  @optional_fields ~w(email age language_id country_id city_id)
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
    if birthdate = get_change(changeset, :birthdate) do
      timex_birthdate = birthdate |> Ecto.Date.to_erl |> Date.from_erl
      date_diff = Date.diff(Date.now, timex_birthdate, :years)

      changeset
      |> put_change(:age, date_diff)
    else
      changeset
    end
  end

  def without_experiment do
    from p in Participant,
      left_join: ehp in assoc(p, :experiments_has_participants),
      left_join: e in assoc(ehp, :experiment),
      where: e.end_date < ^Ecto.DateTime.utc or is_nil(ehp.participant_id),
      select: p
  end

  def with_experiment_uuid do
    from p in Participant,
      left_join: ehp in assoc(p, :experiments_has_participants),
      left_join: e in assoc(ehp, :experiment),
      where: e.end_date >= ^Ecto.DateTime.utc,
      select: {p, ehp.uuid}
  end

  def with_language do
    from p in Participant,
      preload: [:language],
      select: p
  end
end
