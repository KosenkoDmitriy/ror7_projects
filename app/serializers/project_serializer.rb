class ProjectSerializer
  include JSONAPI::Serializer
  attributes :id, :title, :description, :date_created, :status
end
