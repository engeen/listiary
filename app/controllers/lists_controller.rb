class ListsController < ApplicationController
before_action :authenticate_user!

  def update
    @list = current_user.lists.find params[:id]

    respond_to do |format|
      if @list.update_attributes(list_params)
        format.html { redirect_to(@list, :notice => 'List was successfully updated.') }
        format.json { respond_with_bip(@list) }
      else
        format.html { render :action => "edit" }
        format.json { respond_with_bip(@list) }
      end
    end
  end


  def destroy
    @list = current_user.lists.find params[:id]
    @list.destroy if @list
    redirect_to root_url
  end


  def left
    @list = current_user.lists.find(params[:id])
    @previous = current_user.lists.where('position < ?', @list.position).order('position DESC').first
    if @previous 
      pos = @list.position
      @list.position = @previous.position
      @previous.position = pos
      @list.save!
      @previous.save!
    end
    redirect_to root_url
  end


  def right
    @list = current_user.lists.find(params[:id])
    @next = current_user.lists.where('position > ?', @list.position).order('position ASC').first
    if @next 
      pos = @list.position
      @list.position = @next.position
      @next.position = pos
      @list.save!
      @next.save!
    end
    redirect_to root_url
    
  end


  def create
    position = current_user.lists.maximum(:position).nil? ? 1 : List.maximum(:position) +1 
    @list = current_user.lists.create(:position => position)
    redirect_to root_url
  end

protected

def list_params
  params.require(:list).permit(:name)
end

end
