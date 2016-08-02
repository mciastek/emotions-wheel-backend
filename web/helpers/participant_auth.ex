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
      {:ok, _} ->
        experiments_has_participants = ExperimentsHasParticipants
          |> Repo.get_by(uuid: token)

        experiment = Experiment.with_photos_researcher
          |> Repo.get(experiments_has_participants.experiment_id)

        participant = Participant.with_language
          |> Repo.get(experiments_has_participants.participant_id)

        experiment |> check_experiment(participant)
      :error -> {:error, "Token is invalid!"}
    end
  end

  defp check_token(token) do
    Ecto.UUID.cast(token)
  end

  defp check_experiment(experiment, participant) do
    is_active = experiment |> Experiment.active?
    has_completed = experiment |> ExperimentCompletion.completed?(participant.id)

    experiment = experiment |> Map.merge(%{ is_active: is_active, has_completed: has_completed })

    {:ok, experiment, participant}
  end
end
