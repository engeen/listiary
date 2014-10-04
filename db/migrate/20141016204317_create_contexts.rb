class CreateContexts < ActiveRecord::Migration
  def change
    create_table :contexts do |t|
      t.string :name
      t.references :user, index: true

      t.timestamps
    end
  end
end
