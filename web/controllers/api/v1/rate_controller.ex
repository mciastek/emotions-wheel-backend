defmodule EmotionsWheelBackend.RateController do
  use EmotionsWheelBackend.Web, :controller

  import Ecto.Query, only: [from: 2]

  alias EmotionsWheelBackend.{Repo, Rate}

  def delete_by_experiment_participant(conn, params) do
    %{
      "participant_id" => participant_id,
      "experiment_id" => experiment_id
    } = params

    {deleted_number, _} = experiment_id
      |> rate_delete_query(participant_id)
      |> Repo.delete_all

    render(conn, "deleted.json", %{deleted_number: deleted_number})
  end

  defp rate_delete_query(experiment_id, participant_id) do
    from r in Rate,
      where: r.experiment_id == ^experiment_id and r.participant_id == ^participant_id
  end
end
