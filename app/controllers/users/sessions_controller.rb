# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  respond_to :json
  #sessions_controller.rb

  before_action :configure_sign_in_params, only: [:create]
  before_action :configure_sign_out_params, only: [:destroy]
  
  # GET /resource/sign_in
  def new
    super
  end
  
  # POST /resource/sign_in
  def create
    super
  end

  # DELETE /resource/sign_out
  def destroy
    super
  end

  private
  
  def respond_with(resource, _opts = {})
    if resource.present?
      render json: {
        status: {code: 200, message: 'Logged in successfully.'},
        data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
      }, status: :ok
    else
      render json: {
        status: 401,
        message: "You need to sign in or sign up before continuing."
      }, status: :unauthorized
    end
  end

  def respond_to_on_destroy
    render json: {
      status: { code: 200,
      message: 'Logged out successfully' }
    }, status: :ok
  end

  protected

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_in_params
    devise_parameter_sanitizer.permit(:user, keys: [:id, :email, :password])
  end

  def configure_sign_out_params
    devise_parameter_sanitizer.permit(:user, keys: [:attribute, :id])
    # params.require(:user).permit(:id, :email)
  end
end
