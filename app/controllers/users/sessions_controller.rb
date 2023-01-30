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
    # current_user = resource = User.find(configure_sign_out_params[:id])
    super


    # warden.logout
    # expire_data_after_sign_out!
    # warden.clear_strategies_cache!

    # signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    # set_flash_message! :notice, :signed_out if signed_out
    # yield if block_given?
    # respond_to_on_destroy
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
    # if current_user
      render json: {
        status: { code: 200,
        message: 'Logged out successfully' }
      }, status: :ok
    # else
    #   render json: {
    #     status: { code: 401,
    #     message: "Couldn't find an active session." }
    #   }, status: :unauthorized
    # end
  end

  protected

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_in_params
    #params.require(:user).permit(:id, :email, :password)
    devise_parameter_sanitizer.permit(:user) do |user_params|
      # user_params.require(:user).permit(:email, :password)
      user_params.permit(:email, :password)
    end
    # devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute, :id, :email, :password])
  end

  def configure_sign_out_params
    # devise_parameter_sanitizer.permit(:user, keys: [:attribute, :id])
    params.require(:user).permit(:id, :email)
  end
end
