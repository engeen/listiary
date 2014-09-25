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
        date[l.id] = l.tasks.find_or_create_by(:target => date[:date])
      end
      @dates.push(date)

    end
    
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
          date[l.id]  = l.tasks.find_or_create_by(:target => date[:date])
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
          date[l.id]  = l.tasks.find_or_create_by(:target => date[:date])
        end
        @dates.push(date)
      end
      @dates.reverse!
    end
  end


end
