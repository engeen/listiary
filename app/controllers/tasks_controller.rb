class TasksController < ApplicationController
before_action :authenticate_user!


  def update
    @task = current_user.tasks.find params[:id]
#    debugger
    respond_to do |format|
      if @task.update_attributes(task_params)
        format.html { redirect_to(@task, :notice => 'Task was successfully updated.') }
        format.json { render :json => @task }
      else
        format.html { render :action => "edit" }
        format.json { render :json => @task }
      end
    end
  end
  
  


  def create
    @list = current_user.lists.find(task_params[:list_id])
    if @list
      unless task_params[:context_id]
        @task = @list.tasks.create(task_params)
      else
        @task = @list.tasks.where(:target => task_params[:target], :context_id => task_params[:context_id]).first
        @task = @list.tasks.create(task_params) unless @task
      end
      
      unless @task.context 
        @task.create_context(:name => "Контекст/группа", :user_id => current_user.id)
        @task.save!
      end
      respond_to do |format|
          format.js { }
      end
    end
  end
  # 
  # 
  def destroy
    @task = current_user.tasks.find params[:id]
    @task.destroy if @task
    respond_to do |format|
        format.js { }
    end
  end
  # 
  # 
  # def complete 
  #   @task = current_user.tasks.find params[:id]
  #   if @task.complete?
  #     @task.update_attributes(:complete => false) 
  #   else 
  #     @task.update_attributes(:complete => true) 
  #   end
  # end


protected
  def task_params
    params.require(:task).permit([:content,:list_id, :target, :context_id, :context_name]) #:list_id, :target, 
  end
  

end
