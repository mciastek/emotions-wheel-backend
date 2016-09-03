defmodule EmotionsWheelBackend.RatesCSVController do
  use EmotionsWheelBackend.Web, :controller
  use Timex

  alias EmotionsWheelBackend.{Repo, Experiment, RateView}

  @attributes_rates ~w(id name pos_x pos_y time start_time end_time participant_id participant experiment_id experiment photo_id photo)a

  def export(conn, %{"experiment_id" => experiment_id}) do
    experiment = Experiment.with_rates |> Repo.get(experiment_id)

    conn
    |> put_resp_content_type("text/csv")
    |> put_resp_header("Content-Disposition", "attachment; filename=\"#{file_name(experiment)}\"")
    |> send_resp(200, csv_content(experiment))
  end

  defp csv_content(experiment) do
    rates = experiment.rates
      |> Repo.preload([:photo, :participant])
      |> render_rates(experiment)

    rates
    |> CSV.encode(headers: @attributes_rates)
    |> Enum.to_list
    |> to_string
  end

  defp file_name(experiment) do
    time_prefix = DateTime.now |> Timex.format!("%Y-%m-%d", :strftime)
    "#{time_prefix}_#{experiment.name}_rates.csv"
  end

  defp render_rates(rates, experiment) do
    rates
    |> Enum.map(&Map.take(&1, @attributes_rates))
    |> Enum.map(&single_rate(&1, experiment))
  end

  defp single_rate(rate, experiment) do
    rate
    |> Map.put(:participant, "#{rate.participant.first_name} #{rate.participant.last_name}")
    |> Map.put(:photo, rate.photo.name)
    |> Map.put(:experiment, experiment.name)
  end
end
