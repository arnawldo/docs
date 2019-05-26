Rails.application.routes.draw do
  root 'home#index'

  resources :users, only: [:new, :create] do
    resources :documents
  end
  resources :sessions, only: [:new, :create, :destroy]

  get 'signup', to: 'users#new', as: 'signup'
  get 'login', to: 'sessions#new', as: 'login'
  get 'logout', to: 'sessions#destroy', as: 'logout'
end
