defmodule EmotionsWheelBackend.ExperimentsHasParticipants do
  use EmotionsWheelBackend.Web, :model

  alias EmotionsWheelBackend.{Participant, Experiment}

  schema "experiments_has_participants" do
    field :uuid, Ecto.UUID
    timestamps

    belongs_to :experiment, Experiment
    belongs_to :participant, Participant
  end

  @required_fields ~w(uuid)
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
