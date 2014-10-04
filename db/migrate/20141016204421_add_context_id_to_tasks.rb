class AddContextIdToTasks < ActiveRecord::Migration
  def change
    add_reference :tasks, :context, index: true
  end
end
