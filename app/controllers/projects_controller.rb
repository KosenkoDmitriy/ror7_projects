class ProjectsController < ApplicationController
  respond_to :json
  before_action :set_project, only: %i[ show edit update destroy ]

  # GET /projects
  def index
    @projects = Project.all
    render json: {
        status: {code: 200, message: 'Projects were successfully fetched.'},
        data: @projects
      }, status: :ok
  end

  # GET /projects/1
  def show
  end

  # GET /projects/new
  def new
    @project = Project.new
  end

  # GET /projects/1/edit
  def edit
  end

  # POST /projects
  def create
    @project = Project.new(project_params)

    if @project.save
      # redirect_to @project, notice: "Project was successfully created."
      render json: {
        status: {code: 200, message: 'Project was successfully created.'},
        data: @project
      }, status: :ok
    else
      # render :new, status: :unprocessable_entity
      render json: {
        status: {message: "Project couldn't be created successfully. #{resource.errors.full_messages.to_sentence}"},
      }, status: :unprocessable_entity
    end

    
  end

  # PATCH/PUT /projects/1
  def update
    if @project.update(project_params)
      # redirect_to @project, notice: "Project was successfully updated."
      render json: {
        status: {code: 200, message: 'Project was successfully updated.'},
        data: @project
      }, status: :ok
    else
      # render :edit, status: :unprocessable_entity
      render json: {
        status: {message: "Project couldn't be updated successfully. #{resource.errors.full_messages.to_sentence}"},
      }, status: :unprocessable_entity
    end
  end

  # DELETE /projects/1
  def destroy
    @project.destroy
    # redirect_to projects_url, notice: "Project was successfully destroyed."
    render json: {
        status: {message: "Project was successfully destroyed.. #{resource.errors.full_messages.to_sentence}"},
      }, status: :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_project
      @project = Project.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def project_params
      params.require(:project).permit(:title, :description)
    end
end
