defmodule EmotionsWheelBackend.Router do
  use EmotionsWheelBackend.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]

    plug Guardian.Plug.VerifyHeader
    plug Guardian.Plug.LoadResource
  end

  scope "/api", EmotionsWheelBackend do
    pipe_through :api

    scope "/v1" do
      resources "researchers", ResearcherController, only: [:index, :show]
      resources "experiments", ExperimentController, only: [:index, :show, :create, :update, :delete]
      resources "participants", ParticipantController, only: [:index, :show, :create, :update, :delete]
      resources "languages", LanguageController, only: [:index, :show]
      resources "countries", CountryController, only: [:index, :show]
      resources "cities", CityController, only: [:index, :show, :create]
      resources "photos", PhotoController, only: [:index, :create, :delete]

      get "/stats", StatsController, :index

      post "/session", SessionController, :create
      delete "/session", SessionController, :delete

      get "/participants_free", ParticipantController, :get_free_participants

      get "/participants/:id/photos", GalleryController, :index

      delete "/experiments/:experiment_id/participants/:participant_id/rates", RateController, :delete_by_experiment_participant

      get "/experiments/:experiment_id/rates/csv", RatesCSVController, :export

      scope "app" do
        post "/sign-in", SignInController, :create

        get "/participants/:id/photos", GalleryController, :index
        post "/participants/:id/photos", GalleryController, :create_photo
      end
    end
  end

  scope "/", EmotionsWheelBackend do
    pipe_through :browser # Use the default browser stack

    get "*path", PageController, :index
  end
end
