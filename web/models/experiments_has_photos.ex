defmodule EmotionsWheelBackend.ExperimentsHasPhotos do
  use EmotionsWheelBackend.Web, :model

  alias EmotionsWheelBackend.{Photo, Experiment}

  schema "experiments_has_photos" do
    field :order_no, :integer
    timestamps

    belongs_to :experiment, Experiment
    belongs_to :photo, Photo
  end

  @required_fields ~w(experiment_id photo_id)
  @optional_fields ~w(order_no)

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
