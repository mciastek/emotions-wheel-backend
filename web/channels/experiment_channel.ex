defmodule EmotionsWheelBackend.ExperimentChannel do
  use EmotionsWheelBackend.Web, :channel

  alias EmotionsWheelBackend.{Rate, RateView}

  def join("experiments:" <> experiment_id, %{"participant_id" => participant_id}, socket) do
    rates = saved_rates(experiment_id, participant_id)

    socket = socket
      |> assign(:experiment_id, experiment_id)
      |> assign(:participant_id, participant_id)

    {:ok, %{rates: rates}, socket}
  end

  def terminate(_reason, _socket) do
    :ok
  end

  def handle_in("participant:new_rate", payload, socket) do
    case save_or_update_rate(payload) do
      {:ok, _rate} ->
        rates = saved_rates(socket.assigns[:experiment_id], socket.assigns[:participant_id])

        broadcast_from!(socket, "experiment:new_rate", %{rates: rates})

        {:reply, {:ok, %{rates: rates}}, socket}
      {:error, changeset} ->
        errors = RateView.render("error.json", %{changeset: changeset})

        {:reply, {:error, errors}, socket}
    end
  end

  defp save_or_update_rate(params) do
    experiment_id = params["experiment_id"]
    participant_id = params["participant_id"]
    photo_id = params["photo_id"]

    clauses = [
      experiment_id: experiment_id,
      participant_id: participant_id,
      photo_id: photo_id
    ]

    model =
      case Rate |> Repo.get_by(clauses) do
        nil -> %Rate{}
        rate -> rate
      end

    result = model
      |> Rate.changeset(params)
      |> Repo.insert_or_update
  end

  defp saved_rates(experiment_id, participant_id) do
    Rate.by_experiment_participant(experiment_id, participant_id)
    |> Repo.all
    |> RateView.render_many
  end
end
