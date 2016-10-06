class User < ApplicationRecord

  has_one :team
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

         after_create :set_team



         def set_team   
         
          @team = Team.new
          self.team = @team




         end
end
