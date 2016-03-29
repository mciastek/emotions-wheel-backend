defmodule EmotionsWheelBackend.GuardianSerializer do
  @behaviour Guardian.Serializer

  alias EmotionsWheelBackend.{Repo, Researcher}

  def for_token(researcher = %Researcher{}), do: { :ok, "Researcher:#{researcher.id}" }
  def for_token(_), do: { :error, "Unknown resource type" }

  def from_token("Researcher:" <> id), do: { :ok, Repo.get(Researcher, String.to_integer(id)) }
  def from_token(_), do: { :error, "Unknown resource type" }
end
