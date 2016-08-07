defmodule EmotionsWheelBackend.ParticipantChannel do
  use EmotionsWheelBackend.Web, :channel

  alias EmotionsWheelBackend.{
    Repo,
    Experiment,
    RateView,
    ExperimentView,
    RateUpdate,
    ExperimentCompletion,
    Presence,
    Endpoint
  }

  def join("participant:experiment", %{"experiment_id" => experiment_id, "participant_id" => participant_id}, socket) do
    rates = RateUpdate.saved_rates(experiment_id, participant_id)

    socket = socket
      |> assign(:experiment_id, experiment_id)
      |> assign(:participant_id, participant_id)

    send(self, :after_join)

    {:ok, %{rates: rates}, socket}
  end

  def terminate(_reason, socket) do
    :ok
  end

  def handle_info(:after_join, socket) do
    {:ok, _} = Presence.track(socket, socket.assigns[:participant_id], %{
      online_at: inspect(System.system_time(:seconds))
    })

    Endpoint.broadcast("admin:results", "participant:presence_state", Presence.list(socket))

    {:noreply, socket}
  end

  def handle_in("participant:new_rate", payload, socket) do
    case RateUpdate.save_or_update_rate(payload) do
      {:ok, _rate} ->
        experiment_id = socket.assigns[:experiment_id]
        participant_id = socket.assigns[:participant_id]

        rates = RateUpdate.saved_rates(experiment_id, participant_id)

        experiment_completed = experiment_id
          |> check_experiment_progress(participant_id, rates)

        response = %{rates: rates, experiment_completed: experiment_completed}

        Endpoint.broadcast("admin:results", "experiment:new_rate", %{rates: rates})

        {:reply, {:ok, response}, socket}
      {:error, changeset} ->
        errors = RateView.render("error.json", %{changeset: changeset})

        {:reply, {:error, errors}, socket}
    end
  end

  def handle_in("presence_diff", payload, socket) do
    Endpoint.broadcast("admin:results", "participant:presence_diff", payload)

    {:noreply, socket}
  end

  defp check_experiment_progress(experiment_id, participant_id, rates) do
    experiment = Experiment.with_photos
      |> Repo.get(experiment_id)
      |> ExperimentView.render_one(:lite)

    experiment
    |> ExperimentCompletion.completed?(participant_id, rates)
  end
end
