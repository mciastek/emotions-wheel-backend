defmodule EmotionsWheelBackend.Photo do
  use EmotionsWheelBackend.Web, :model
  use Arc.Ecto.Model

  alias EmotionsWheelBackend.{ExperimentsHasPhotos, PhotoFileDefinition}

  schema "photos" do
    field :name, :string
    field :url, PhotoFileDefinition.Type
    field :author_type, :string
    field :author_id, :integer
    timestamps

    belongs_to :rate, Rate

    has_many :experiments_has_photos, ExperimentsHasPhotos
    has_many :experiments, through: [:experiments_has_photos, :experiments]
  end

  @required_fields ~w(name)
  @optional_fields ~w(author_type author_id)

  @required_file_fields ~w(url)
  @optional_file_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> cast_attachments(params, @required_file_fields, @optional_file_fields)
  end
end
