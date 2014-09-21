class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.date :target
      t.text :content
      t.references :list, index: true

      t.timestamps
    end
  end
end