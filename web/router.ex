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
  end

  scope "/api", EmotionsWheelBackend do
    pipe_through :api

    scope "/v1" do
      resources "researchers", ResearcherController, only: [:index]
    end
  end

  scope "/", EmotionsWheelBackend do
    pipe_through :browser # Use the default browser stack

    get "*path", PageController, :index
  end
end
