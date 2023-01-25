require "test_helper"

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  setup do
    @attrs = { email: 'user@ex.com' }
  end
  test "Allow the user to create one or more projects" do
    # user = User.new email: 'user@ex.com'
    user = User.create email: 'user@ex.com'
  #   project_data = [
  #     no: '#1',
  #     title: 'test project',
  #     descrtiption: 'test description',
  #     date_created: '',
  #     users: [user], #assigned to
  #     status: 'active' #todo: enum
  # ]
  # user.projects << Project.new(project_data)
  # user.projects << Project.new(project_data)
  # assert_equal user.projects.count, 1
  assert_equal user.email, 'user@ex.com'
  end
# User can get an overview of all the projects
# • For each project the user can create one or more issues
# The user can get an overview of all issues on a project 
# • The issues can be created, edited and commented by the users
end
