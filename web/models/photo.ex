defmodule EmotionsWheelBackend.Photo do
  use EmotionsWheelBackend.Web, :model

  alias EmotionsWheelBackend.{ExperimentsHasPhotos}

  schema "photos" do
    field :name, :string
    field :url, :string
    field :author_type, :string
    field :author_id, :integer
    timestamps

    belongs_to :rate, Rate

    has_many :experiments_has_photos, ExperimentsHasPhotos
    has_many :experiments, through: [:experiments_has_photos, :experiments]
  end

  @required_fields ~w(name url)
  @optional_fields ~w(author_type author_id)

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
