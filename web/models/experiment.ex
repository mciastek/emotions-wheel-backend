defmodule EmotionsWheelBackend.Experiment do
  use EmotionsWheelBackend.Web, :model

  alias EmotionsWheelBackend.{ExperimentsHasPhotos, ExperimentsHasParticipants, Researcher, Rate}

  @derive {Poison.Encoder, only: [
    :id,
    :name,
    :kind,
    :start_date,
    :end_date
  ]}

  schema "experiments" do
    field :name, :string
    field :kind, :string
    field :start_date, Ecto.DateTime
    field :end_date, Ecto.DateTime
    timestamps

    belongs_to :researcher, Researcher

    has_many :rates, Rate
    has_many :experiments_has_photos, ExperimentsHasPhotos
    has_many :photos, through: [:experiments_has_photos, :photos]
    has_many :experiments_has_participants, ExperimentsHasParticipants
    has_many :participants, through: [:experiments_has_participants, :participants]
  end

  @required_fields ~w(name kind)
  @optional_fields ~w(start_date end_date researcher_id)
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
  end
end
