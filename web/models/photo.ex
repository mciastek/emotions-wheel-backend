defmodule EmotionsWheelBackend.Photo do
  use EmotionsWheelBackend.Web, :model
  use Arc.Ecto.Model

  alias EmotionsWheelBackend.{ExperimentsHasPhotos, Rate, PhotoFileDefinition}

  @derive {Poison.Encoder, only: [
    :id,
    :name,
    :url,
    :author_type,
    :author_id
  ]}

  schema "photos" do
    field :name, :string
    field :url, :string, virtual: true
    field :file, PhotoFileDefinition.Type
    field :author_type, :string
    field :author_id, :integer
    timestamps

    has_many :rates, Rate, on_delete: :delete_all
    has_many :experiments_has_photos, ExperimentsHasPhotos, on_delete: :delete_all
    has_many :experiments, through: [:experiments_has_photos, :experiments]
  end

  @required_fields ~w(name)
  @optional_fields ~w(author_type author_id)

  @required_file_fields ~w(file)
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
