defmodule EmotionsWheelBackend.Researcher do
  use EmotionsWheelBackend.Web, :model

  schema "researchers" do
    field :login, :string
    field :encrypted_password, :string
    field :password, :string, virtual: true
    field :password_confirmation, :string, virtual: true
    field :first_name, :string
    field :last_name, :string
    field :email, :string
    field :phone, :string
    timestamps
  end

  @required_fields ~w(login password password_confirmation)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> validate_unique(:login, on: EmotionsWheelBackend.Repo, downcase: true)
    |> validate_length(:password, min: 6)
    |> validate_length(:password_confirmation, min: 6)
    |> validate_confirmation(:password)
  end
end
