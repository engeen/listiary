class ContextsController < ApplicationController
before_action :authenticate_user!





    def update
      @context = current_user.contexts.find params[:id]

      
  #    debugger
      respond_to do |format|
        if @context.update_attributes(context_params)
          format.html { redirect_to(@context, :notice => 'Task was successfully updated.') }
          format.json {respond_with_bip(@context) }
        else
          format.html { render :action => "edit" }
          format.json { respond_with_bip(@context) }
        end
      end
    end



    def destroy
      @context = current_user.contexts.find params[:id]
      @context.destroy if @context
      redirect_to :back
    end



    protected
      def context_params
        params.require(:context).permit([:name]) #:list_id, :target, 
      end

end
