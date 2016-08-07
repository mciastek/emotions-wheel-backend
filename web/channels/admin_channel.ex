defmodule EmotionsWheelBackend.AdminChannel do
  use EmotionsWheelBackend.Web, :channel

  alias EmotionsWheelBackend.{RateUpdate, Presence}

  def join("admin:results", params, socket) do
    %{
      "experiment_id" => experiment_id,
      "participant_id" => participant_id
    } = params

    rates = RateUpdate.saved_rates(experiment_id, participant_id)

    socket = socket
      |> assign(:experiment_id, experiment_id)
      |> assign(:participant_id, participant_id)

    send(self, :after_join)

    {:ok, %{rates: rates}, socket}
  end

  def terminate(_reason, _socket) do
    :ok
  end

  def handle_info(:after_join, socket) do
    push(socket, "participant:presence_state", Presence.list("participant:experiment"))

    {:noreply, socket}
  end
end
