class TasksController < ApplicationController
before_action :authenticate_user!


  def update
    @task = current_user.tasks.find params[:id]

    respond_to do |format|
      if @task.update_attributes(task_params)
        format.html { redirect_to(@task, :notice => 'Task was successfully updated.') }
        format.json { respond_with_bip(@task) }
      else
        format.html { render :action => "edit" }
        format.json { respond_with_bip(@task) }
      end
    end
  end
  
  
  
  def create
    @list = current_user.lists.find(task_params[:list_id])
    if @list
      @task = @list.tasks.create(task_params)
      respond_to do |format|
          format.js { }
      end
    end
  end
  
  
  def destroy
    @task = current_user.tasks.find params[:id]
    @task.destroy if @task
    respond_to do |format|
        format.js { }
    end
  end
  
  
  def complete 
    @task = current_user.tasks.find params[:id]
    if @task.complete?
      @task.update_attributes(:complete => false) 
    else 
      @task.update_attributes(:complete => true) 
    end
  end


protected
  def task_params
    params.require(:task).permit([:list_id, :target, :content])
  end
  

end
