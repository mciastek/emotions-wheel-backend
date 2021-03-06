defmodule EmotionsWheelBackend.Mixfile do
  use Mix.Project

  def project do
    [app: :emotions_wheel_backend,
     version: "0.0.1",
     elixir: "~> 1.0",
     elixirc_paths: elixirc_paths(Mix.env),
     compilers: [:phoenix, :gettext] ++ Mix.compilers,
     build_embedded: Mix.env == :prod,
     start_permanent: Mix.env == :prod,
     aliases: aliases,
     deps: deps]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [mod: {EmotionsWheelBackend, []},
     applications: [:phoenix, :phoenix_pubsub, :phoenix_html, :cowboy, :logger, :gettext,
                    :phoenix_ecto, :postgrex, :timex, :comeonin, :guardian, :ex_aws, :httpoison]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "web", "test/support"]
  defp elixirc_paths(_),     do: ["lib", "web"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [{:plug, "~> 1.0"},
     {:phoenix, "~> 1.2.0"},
     {:postgrex, ">= 0.0.0"},
     {:phoenix_ecto, "~> 2.0"},
     {:phoenix_html, "~> 2.4"},
     {:phoenix_pubsub, "~> 1.0"},
     {:phoenix_live_reload, "~> 1.0", only: :dev},
     {:gettext, "~> 0.9"},
     {:cowboy, "~> 1.0"},
     {:timex, "~> 2.0.0"},
     {:timex_ecto, "~> 1.0.0"},
     {:comeonin, "~> 2.2.0"},
     {:guardian, "~> 0.10.0"},
     {:arc, "~> 0.5.2"},
     {:arc_ecto, "~> 0.3.2", override: true},
     {:mix_test_watch, "~> 0.2", only: :dev},
     {:mock, "~> 0.1.1", only: :test},
     {:corsica, "~> 0.4"},
     {:ex_aws, "~> 0.4.10"},
     {:httpoison, "~> 0.7"},
     {:poison, "~> 1.2"},
     {:csv, "~> 1.4.2"}]
  end

  # Aliases are shortcut or tasks specific to the current project.
  # For example, to create, migrate and run the seeds file at once:
  #
  #     $ mix ecto.setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    ["ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
     "ecto.reset": ["ecto.drop", "ecto.setup"]]
  end
end
