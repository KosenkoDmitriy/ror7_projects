require "rails_helper"

RSpec.describe "Sign up", type: :request do
    context 'create new user' do
        let(:user_params) { {user: { email: 'test@email.com', password: 'pwdpwd', password_confirmation: 'pwdpwd' }} }

        it 'successfully' do
            post '/sign_up', params: user_params#, headers: @headers
        #   expect(response.body).to include(I18n.t('pages.user.signup.success'))
            expect(response.status).to eq(200)
            expect(response_json.keys).not_to include('error')
        end
    end
end