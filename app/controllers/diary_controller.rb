class DiaryController < ApplicationController
before_action :authenticate_user!
layout "diary"

  def index
    @lists = current_user.lists.order("position ASC")
    
    @first_date = current_date = Date.today.yesterday
    
    @dates = Array.new
    (0..10).each do |d|
      date = Hash.new
      @last_date = date[:date] = d.days.since(current_date)
      @lists.each do |l|
        date[l.id] = l.tasks.where(:context_id => nil,:target => date[:date]).first
        unless date[l.id]
          date[l.id] = l.tasks.create(:target => date[:date])
        end
      end
      @dates.push(date)

    end
    
  end




  def settings
    @contexts = current_user.contexts
    render :layout => "application"
  end





  def dates
    @lists = current_user.lists.order("position ASC")
    
    if params[:last]
      @first_date = current_date = Date.parse(params[:last])
      @dates = Array.new
      (1..1).each do |d|
        date = Hash.new
        @last_date = date[:date] = d.days.since(current_date)
        @lists.each do |l|
          date[l.id]  = l.tasks.where(:context_id => nil,:target => date[:date]).first
          unless date[l.id]
            date[l.id] = l.tasks.create(:target => date[:date])
          end
        end
        @dates.push(date)
      end

    elsif params[:first]
      
      @last_date = current_date = Date.parse(params[:first])
      @dates = Array.new
      (1..1).each do |d|
        date = Hash.new
        @first_date = date[:date] = @last_date - d.days
        @lists.each do |l|
          date[l.id]  = l.tasks.where(:context_id => nil,:target => date[:date]).first
          unless date[l.id]
            date[l.id] = l.tasks.create(:target => date[:date])
          end
        end
        @dates.push(date)
      end
      @dates.reverse!
    end
  end


end
