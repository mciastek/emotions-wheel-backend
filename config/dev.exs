use Mix.Config

# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with brunch.io to recompile .js and .css sources.
config :emotions_wheel_backend, EmotionsWheelBackend.Endpoint,
  http: [port: 4000],
  debug_errors: true,
  code_reloader: true,
  cache_static_lookup: false,
  check_origin: false,
  watchers: [
    node: ["node_modules/webpack/bin/webpack.js", "--watch", "--color", "--display-error-details"]
  ]

# Watch static and templates for browser reloading.
config :emotions_wheel_backend, EmotionsWheelBackend.Endpoint,
  live_reload: [
    patterns: [
      ~r{priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$},
      ~r{priv/gettext/.*(po)$},
      ~r{web/views/.*(ex)$},
      ~r{web/templates/.*(eex)$}
    ]
  ]

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development.
# Do not configure such in production as keeping
# and calculating stacktraces is usually expensive.
config :phoenix, :stacktrace_depth, 20

# Configure your database
config :emotions_wheel_backend, EmotionsWheelBackend.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "mciastek",
  password: "",
  database: "emotions_wheel_backend_dev",
  hostname: "localhost",
  pool_size: 10

# Guardian config
config :guardian, Guardian,
  ttl: { 30, :days },
  secret_key: "005f0eea-4eaf-4228-b67c-80d7fc6a5d7a"
