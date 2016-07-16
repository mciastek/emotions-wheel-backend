defmodule EmotionsWheelBackend.Experiment do
  use EmotionsWheelBackend.Web, :model

  alias EmotionsWheelBackend.{Experiment, ExperimentsHasPhotos, ExperimentsHasParticipants, Researcher, Rate}

  schema "experiments" do
    field :name, :string
    field :kind, :string
    field :start_date, Ecto.DateTime
    field :end_date, Ecto.DateTime
    field :participants_ids, {:array, :integer}, virtual: true
    field :photos_ids, {:array, :integer}, virtual: true
    timestamps

    belongs_to :researcher, Researcher

    has_many :rates, Rate, on_delete: :delete_all
    has_many :experiments_has_photos, ExperimentsHasPhotos, on_delete: :delete_all
    has_many :photos, through: [:experiments_has_photos, :photos]
    has_many :experiments_has_participants, ExperimentsHasParticipants, on_delete: :delete_all
    has_many :participants, through: [:experiments_has_participants, :participants]
  end

  @required_fields ~w(name kind)
  @optional_fields ~w(start_date end_date researcher_id participants_ids photos_ids)
  @kind_valid ~w(free_mode experiment)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> validate_inclusion(:kind, @kind_valid, message: "Should be free_mode or experiment")
    |> validate_date_ranges
  end

  defp validate_date_ranges(changeset) do
    start_date = get_field(changeset, :start_date)
    end_date = get_field(changeset, :end_date)

    if start_date && end_date do
      comparision = Ecto.DateTime.compare(start_date, end_date)

      if comparision == :gt do
        changeset
        |> add_error(:end_date, "End date shouldn't be earlier than start date!")
      else
        check_if_experiment_continues(changeset, end_date)
      end
    else
      changeset
    end
  end

  defp check_if_experiment_continues(changeset, end_date) do
    now = Ecto.DateTime.utc
    comparision = Ecto.DateTime.compare(now, end_date)

    if comparision == :gt do
      changeset
      |> add_error(:ended, "Experiment has ended!")
    else
      changeset
    end
  end

  def active?(model) do
    model.end_date >= Ecto.DateTime.utc
  end

  def with_participants do
    from e in Experiment,
      left_join: ehp in assoc(e, :experiments_has_participants),
      left_join: p in assoc(ehp, :participant),
      preload: [participants: p]
  end

  def with_photos do
    from e in Experiment,
      left_join: ehp in assoc(e, :experiments_has_photos),
      left_join: p in assoc(ehp, :photo),
      preload: [photos: p]
  end

  def with_participants_and_photos do
    from e in Experiment,
      left_join: ehp in assoc(e, :experiments_has_participants),
      left_join: pa in assoc(ehp, :participant),
      left_join: ehph in assoc(e, :experiments_has_photos),
      left_join: ph in assoc(ehph, :photo),
      preload: [participants: pa, photos: ph, experiments_has_participants: ehp]
  end
end
