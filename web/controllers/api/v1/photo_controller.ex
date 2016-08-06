defmodule EmotionsWheelBackend.PhotoController do
  use EmotionsWheelBackend.Web, :controller

  alias EmotionsWheelBackend.{Repo, Photo, PhotoFileDefinition}

  def index(conn, _params) do
    photos = Photo |> Repo.all

    render(conn, "index.json", photos: photos)
  end

  def create(conn, %{"photo" => photo_params}) do
    changeset = Photo.changeset(%Photo{}, photo_params)

    case Repo.insert(changeset) do
      {:ok, photo} ->
        conn
        |> put_status(:created)
        |> render("success.json", photo: photo)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    photo = Photo |> Repo.get!(id)

    case Repo.delete(photo) do
      {:ok, _} ->
        photos = Photo |> Repo.all

        delete_file(photo)

        render(conn, "index.json", photos: photos)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json", changeset: changeset)
    end
  end

  defp delete_file(photo) do
    removed? = PhotoFileDefinition.delete({ photo.file.file_name, photo })

    if removed? == :ok do
      IO.puts "Photo: #{photo.file.file_name} removed!"
    else
      IO.puts "Error! #{removed?}"
    end
  end
end
