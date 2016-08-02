defmodule EmotionsWheelBackend.ExperimentCompletion do
  alias EmotionsWheelBackend.{Repo, Rate}

  @restricted_mode "free_mode"

  def completed?(experiment, participant_id, rates \\ nil) do
    mode = experiment.kind

    photos = experiment.photos

    rates = case rates do
      nil -> experiment.id |> get_rates(participant_id)
      _ -> rates
    end

    mode |> check(rates, photos)
  end

  def restricted_mode, do: @restricted_mode

  defp get_rates(experiment_id, participant_id) do
    experiment_id
    |> Rate.by_experiment_participant(participant_id)
    |> Repo.all
  end

  defp check(mode, _, _) when mode != @restricted_mode, do: false
  defp check(mode, rates, photos) when mode == @restricted_mode do
    length(rates) == length(photos)
  end
end
