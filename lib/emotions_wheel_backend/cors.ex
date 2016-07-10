defmodule EmotionsWheelBackend.CORS do
  use Corsica.Router,
    origin: ["*"],
    allow_headers: ["accept", "content-type"]

  resource "/api/v1/*"
end
