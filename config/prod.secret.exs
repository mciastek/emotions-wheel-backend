use Mix.Config

# In this file, we keep production configuration that
# you likely want to automate and keep it away from
# your version control system.
config :emotions_wheel_backend, EmotionsWheelBackend.Endpoint,
  url: [scheme: "https", host: "emotions-wheel-backend.herokuapp.com", port: 443],
  secret_key_base: System.get_env("SECRET_KEY_BASE")

# Configure your database
config :emotions_wheel_backend, EmotionsWheelBackend.Repo,
  adapter: Ecto.Adapters.Postgres,
  url: System.get_env("DATABASE_URL"),
  pool_size: 20

# Guardian config
config :guardian, Guardian,
  ttl: { 3, :days },
  secret_key: System.get_env("GUARDIAN_SECRET_KEY")
