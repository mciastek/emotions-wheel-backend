defmodule EmotionsWheelBackend.ExperimentChannel do
  use EmotionsWheelBackend.Web, :channel

  alias EmotionsWheelBackend.{Rate, RateView}

  def join("experiments:results:" <> experiment_id, %{"participant_id" => participant_id}, socket) do
    rates = saved_rates(experiment_id, participant_id)

    send(self, :after_join)

    {:ok, %{rates: rates}, assign(socket, :rates, rates)}
  end

  def join("experiments:" <> experiment_id, %{"participant_id" => participant_id}, socket) do
    rates = saved_rates(experiment_id, participant_id)

    send(self, :after_join)

    {:ok, %{rates: rates}, assign(socket, :rates, rates)}
  end

  def terminate(_reason, _socket) do
    :ok
  end

  def handle_in("participant:new_rate", payload, socket) do
    case save_new_rate(payload) do
      {:ok, rate} ->
        broadcast!(socket, "experiment:new_rate", rate)

        {:reply, {:ok, rate}, socket}
      :error ->
        {:reply, :error, socket}
    end
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (experiments:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  defp save_new_rate(params) do
    changeset = Rate.changeset(%Rate{}, params)

    case changeset.valid? do
      true ->
        rate = changeset |> Repo.insert!
        {:ok, rate}
      _ ->
        :error
    end
  end

  defp saved_rates(experiment_id, participant_id) do
    Rate.by_experiment_participant(experiment_id, participant_id)
    |> Repo.all
    |> RateView.render_many
  end
end
