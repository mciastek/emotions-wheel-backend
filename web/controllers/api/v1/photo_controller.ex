defmodule EmotionsWheelBackend.PhotoController do
  use EmotionsWheelBackend.Web, :controller

  alias EmotionsWheelBackend.{Repo, Photo, PhotoFileDefinition}

  def index(conn, _params) do
    photos = Photo |> Repo.all

    thumbs = photo_thumbs(photos)

    render(conn, "index.json", photos: thumbs)
  end

  def create(conn, %{"photo" => photo_params}) do
    changeset = Photo.changeset(%Photo{}, photo_params)

    if changeset.valid? do
      photo = Repo.insert!(changeset)

      conn
      |> put_status(:created)
      |> render("success.json", photo: photo)
    else

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

        thumbs = photo_thumbs(photos)

        delete_file(photo)

        render(conn, "index.json", photos: thumbs)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json", changeset: changeset)
    end
  end

  defp photo_thumbs(photos) do
    Enum.map(photos, fn(photo) ->
      url = PhotoFileDefinition.url({ photo.file, photo }, :thumb)
      %{photo | url: "/" <> url}
    end)
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
