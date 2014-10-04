class Task < ActiveRecord::Base
  belongs_to :list
  belongs_to :context
  
  scope :at, lambda { |list,date|  where(:target => date).where(:list => list)}
  
  attr_accessor :context_name
  
  def context_name
    return context.name
  end


  def context_name=(name_value)


    @context_by_name = self.context.user.contexts.where(:name => name_value).first
    if @context_by_name
      self.context = @context_by_name
      save
    else
      if self.context.name == "Контекст/группа" || self.context.tasks.count < 2
        self.context.update_attributes(:name => name_value)
      else
        self.create_context(:name => name_value, :user_id => self.context.user.id)
        save
      end

    end
  end

  
end
