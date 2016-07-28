defmodule EmotionsWheelBackend.Rate do
  use EmotionsWheelBackend.Web, :model

  alias EmotionsWheelBackend.{Repo, Participant, Experiment, Photo, Rate}

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
    belongs_to :photo, Photo
  end

  @limited_experiment_mode "experiment"
  @required_fields ~w(pos_x pos_y start_time end_time)
  @optional_fields ~w(name time participant_id experiment_id photo_id)

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
    |> validate_by_experiment_mode
  end

  def by_experiment(experiment_id) do
    from r in Rate,
      where: r.experiment_id == ^experiment_id,
      select: r
  end

  def by_experiment_participant(experiment_id, participant_id) do
    from r in Rate,
      where: r.experiment_id == ^experiment_id and r.participant_id == ^participant_id,
      select: r
  end

  defp validate_by_experiment_mode(changeset) do
    experiment_id = get_field(changeset, :experiment_id)
    experiment = Experiment |> Repo.get(experiment_id)

    if experiment.kind == @limited_experiment_mode do
      changeset
      |> validate_by_experiment_mode(experiment_id)
    else
      changeset
    end
  end

  defp validate_by_experiment_mode(changeset, experiment_id) do
    rate_by_experiment = experiment_id
      |> Rate.by_experiment
      |> Repo.all

    case rate_by_experiment do
      nil ->
        changeset
      _ ->
        changeset
        |> add_error(:experiment_id, "Can't insert new rate in \"#{@limited_experiment_mode}\" mode")
    end
  end
end
