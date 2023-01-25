class CreateProjects < ActiveRecord::Migration[7.0]
  def change
    create_table :projects do |t|
      t.integer :no
      t.string :title
      t.text :description
      t.datetime :date_created
      t.string :status

      t.timestamps
    end
  end
end
