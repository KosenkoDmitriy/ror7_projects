Rails.application.routes.draw do
  devise_for :user, path: '', path_names: {
    sign_in: :sign_in,
    sign_out: :sign_out,
    registration: :sign_up
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  root 'homes#index' 

  # namespace :api do
  #   namespace :v1 do
  #     resources :sounds, only: [:index]
  #     end
  #   end
  # end
end
