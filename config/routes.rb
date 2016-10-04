Rails.application.routes.draw do

  root 'application#index'
  resources :teams, only: [:index, :create, :show, :update]
  resources :players, only: [:index, :show]
  resources :indices, only: [:index]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
