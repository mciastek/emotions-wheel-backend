defmodule EmotionsWheelBackend.RateUpdate do
  alias EmotionsWheelBackend.{Repo, Rate, RateView}

  def save_or_update_rate(params) do
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

  def saved_rates(experiment_id, participant_id) do
    Rate.by_experiment_participant(experiment_id, participant_id)
    |> Repo.all
    |> RateView.render_many
  end
end
