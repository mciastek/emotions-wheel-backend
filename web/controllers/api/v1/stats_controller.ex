defmodule EmotionsWheelBackend.StatsController do
  use EmotionsWheelBackend.Web, :controller

  alias EmotionsWheelBackend.{Repo, Participant, Experiment, Photo, Rate}

  import Ecto.Adapters.SQL

  def index(conn, _params) do
    stats = %{
      experiments: experiment_query |> Repo.one,
      participants: participants_query |> Repo.one,
      photos: photos_query |> Repo.one,
      rates: rates_query |> Repo.one,
    }

    conn
    |> render("index.json", stats: stats)
  end

  defp experiment_query do
    from e in Experiment, select: count(e.id)
  end

  defp participants_query do
    from p in Participant, select: count(p.id)
  end

  defp photos_query do
    from p in Photo, select: count(p.id)
  end

  defp rates_query do
    from r in Rate, select: count(r.id)
  end
end
