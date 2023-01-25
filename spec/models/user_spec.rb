require 'rails_helper'

RSpec.describe User, type: :model do
  let!(:user) { create(:user, password: '123456') }
  let!(:prj1) { create(:project, title: 'title 2') }
  let!(:prj2) { create(:project, title: 'title 1') }
  
  context 'User' do
    it 'can create one or more projects' do
      user.projects << prj1
      expect(user.projects.count).to eq(1)
      user.projects << prj2
      expect(user.projects.count).to eq(2)
      expect(prj1.user).to eq(user)
      expect(prj2.user).to eq(user)
    end
    it 'can get an overview of all the projects'
    it 'can create one or more issues for each project'
    xit 'can get an overview of all issues on a project' do
      #prj1.issues << create(:issue, title: 'issue 1 of prj1')
      #prj1.overview
    end
    it 'The issues can be created, edited and commented by the users'
  end

  context 'Project' do
  end

  context 'Issue' do
  end
    
end
