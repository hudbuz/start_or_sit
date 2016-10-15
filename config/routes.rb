Rails.application.routes.draw do

  devise_for :users
  root 'application#index'
  resources :teams
  resources :players
  resources :indices, only: [:index]
  get 'download' => 'player_data#download'
  get 'getstats' => 'player_data#get_stats'
  get 'updatestats' => 'player_data#update_stats'
  get 'getrank' => 'player_data#get_rank'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
