FactoryBot.define do
  factory :project do
    no { 1 }
    title { "MyString" }
    description { "MyText" }
    date_created { "2023-01-25 19:10:09" }
    status { "MyString" }
  end

  factory(:user) do
    email { Faker::Internet.email }
    encrypted_password { Faker::Internet.password }
  end
end
