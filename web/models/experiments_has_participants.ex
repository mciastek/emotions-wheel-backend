defmodule EmotionsWheelBackend.ExperimentsHasParticipants do
  use EmotionsWheelBackend.Web, :model

  alias EmotionsWheelBackend.{Participant, Experiment}

  schema "experiments_has_participants" do
    field :uuid, Ecto.UUID
    timestamps

    belongs_to :experiment, Experiment
    belongs_to :participant, Participant
  end

  @required_fields ~w(experiment_id participant_id)
  @optional_fields ~w(uuid)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> generate_uuid
  end

  defp generate_uuid(changeset) do
    if !get_field(changeset, :uuid) do
      changeset
      |> put_change(:uuid, Ecto.UUID.generate)
    else
      changeset
    end
  end
end
