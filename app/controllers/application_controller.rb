class ApplicationController < ActionController::Base
    respond_to :json
    rescue_from ActionController::ParameterMissing, with: :bad_request
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound, with: :not_found
    
    private
    
    def not_found
        render json: { error: I18n.t('api.errors.not_found') }, status: :not_found
    end

    def unprocessable_entity(exception)
        render json: { error: exception.record.errors.full_messages.join(' ') }, status: :unprocessable_entity
    end

    def bad_request
        render json: { error: I18n.t('api.errors.bad_request') }, status: :bad_request
    end
end
