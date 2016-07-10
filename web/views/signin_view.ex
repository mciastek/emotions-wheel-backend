defmodule EmotionsWheelBackend.SignInView do
  use EmotionsWheelBackend.Web, :view

  def render("success.json", %{success: success}) do
    %{success: success}
  end

  def render("error.json", %{message: message}) do
    %{message: message}
  end
end
