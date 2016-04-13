use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :emotions_wheel_backend, EmotionsWheelBackend.Endpoint,
  http: [port: 4001],
  server: false

# Comeonin config
config :comeonin, bcrypt_log_rounds: 4

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :emotions_wheel_backend, EmotionsWheelBackend.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "emotions_wheel_backend_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

# Guardian config
config :guardian, Guardian,
  secret_key: "iIh4v6MkAw3CbCnfGP7KbD9DUgDE75cgGomM8bm0EUkOkSU8U9pb4hDwpjw7tSNx"
