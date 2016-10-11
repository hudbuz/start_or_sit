class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  skip_before_filter  :verify_authenticity_token
  ##use this to prevent the issue with serializing the user after creation
  after_filter :set_csrf_cookie_for_ng
  before_action :configure_permitted_parameters, if: :devise_controller?
  respond_to :json
  
  def index
  end

  def set_csrf_cookie_for_ng
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end

  protected

  # In Rails 4.2 and above
  def verified_request?
    super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
  end

  private

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username])
  end
end