defmodule EmotionsWheelBackend.Researcher do
  import Comeonin.Bcrypt, only: [hashpwsalt: 1]
  use EmotionsWheelBackend.Web, :model

  schema "researchers" do
    field :email, :string
    field :encrypted_password, :string
    field :password, :string, virtual: true
    field :password_confirmation, :string, virtual: true
    field :first_name, :string
    field :last_name, :string
    field :phone, :string
    timestamps

    has_many :experiments, Experiment
  end

  @required_fields ~w(email password password_confirmation)
  @optional_fields ~w(first_name last_name phone)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> validate_format(:email, ~r/@/)
    |> validate_length(:password, min: 6)
    |> validate_length(:password_confirmation, min: 6)
    |> validate_confirmation(:password, message: "Password did not match!")
    |> unique_constraint(:email, message: "E-mail already taken!")
    |> hash_password
  end

  defp hash_password(changeset) do
    if password = get_change(changeset, :password) do
      changeset
      |> put_change(:encrypted_password, hashpwsalt(password))
    else
      changeset
    end
  end
end
