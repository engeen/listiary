class HomeController < ApplicationController

def index
  redirect_to :controller => :diary, :action => :index if signed_in?
end

end
