defmodule EmotionsWheelBackend.ExperimentChannel do
  use EmotionsWheelBackend.Web, :channel

  alias EmotionsWheelBackend.{Rate, RateView}

  def join("experiments:results:" <> experiment_id, %{"participant_id" => participant_id}, socket) do
    rates = saved_rates(experiment_id, participant_id)

    send(self, :after_join)

    {:ok, %{rates: rates}, assign(socket, :rates, rates)}
  end

  def terminate(_reason, _socket) do
    :ok
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (experiments:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  defp saved_rates(experiment_id, participant_id) do
    Rate.by_experiment_participant(experiment_id, participant_id)
    |> Repo.all
    |> RateView.render_many
  end
end
