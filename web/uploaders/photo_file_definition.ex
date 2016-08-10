defmodule EmotionsWheelBackend.PhotoFileDefinition do
  use Arc.Definition
  use Arc.Ecto.Definition

  @acl :public_read
  @versions [:original, :thumb]
  @extension_whitelist ~w(.jpg .jpeg .gif .png)

  def transform(:thumb, _) do
    {:convert, "-strip -thumbnail 200x200^ -gravity center -extent 200x200"}
  end

  # def __storage, do: Arc.Storage.Local

  def filename(version,  {file, _}), do: "#{file.file_name}"

  # Whitelist file extensions:
  def validate({file, _}) do
    file_extension = file.file_name |> Path.extname |> String.downcase
    Enum.member?(@extension_whitelist, file_extension)
  end

  # Override the storage directory:
  def storage_dir(version, {file, scope}), do: "uploads/photos/#{version}"

  # Provide a default URL if there hasn't been a file uploaded
  # def default_url(version, scope) do
  #   "/images/avatars/default_#{version}.png"
  # end

  # Specify custom headers for s3 objects
  # Available options are [:cache_control, :content_disposition,
  #    :content_encoding, :content_length, :content_type,
  #    :expect, :expires, :storage_class, :website_redirect_location]
  #
  def s3_object_headers(version, {file, scope}) do
    [content_type: Plug.MIME.path(file.file_name)]
  end
end
