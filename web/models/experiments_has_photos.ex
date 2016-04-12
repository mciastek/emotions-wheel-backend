defmodule EmotionsWheelBackend.ExperimentsHasPhotos do
  use EmotionsWheelBackend.Web, :model

  alias EmotionsWheelBackend.{Photo, Experiment}

  schema "experiments_has_photos" do
    timestamps

    belongs_to :experiment, Experiment
    belongs_to :photo, Photo
  end

  @required_fields ~w()
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
