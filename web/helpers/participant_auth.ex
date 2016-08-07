defmodule EmotionsWheelBackend.ParticipantAuth do
  alias EmotionsWheelBackend.{
    Repo,
    ExperimentsHasParticipants,
    Experiment,
    Participant,
    ExperimentCompletion
  }

  def authenticate(%{"token" => token}) do
    case check_token(token) do
      {:ok, ehp} ->
        experiment = Experiment.with_photos_researcher
          |> Repo.get(ehp.experiment_id)

        participant = Participant.with_language
          |> Repo.get(ehp.participant_id)

        experiment |> check_experiment(participant)
      :error ->
        {:error, %{type: :invalid, message: "Token is invalid!"}}
    end
  end

  defp check_token({:ok, token}) do
    experiments_has_participants = ExperimentsHasParticipants
          |> Repo.get_by(uuid: token)

    case experiments_has_participants do
      nil -> :error
      _ -> {:ok, experiments_has_participants}
    end
  end

  defp check_token(token) do
    case Ecto.UUID.cast(token) do
      {:ok, _} -> check_token({:ok, token})
      :error -> :error
    end
  end

  defp check_experiment(experiment, participant) do
    is_active = experiment |> Experiment.active?
    has_completed = experiment |> ExperimentCompletion.completed?(participant.id)

    experiment = experiment |> Map.merge(%{ is_active: is_active, has_completed: has_completed })

    {:ok, experiment, participant}
  end
end
