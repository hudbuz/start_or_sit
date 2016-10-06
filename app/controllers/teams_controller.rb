class TeamsController < ApplicationController



  def index

  end



  def create
    binding.pry
  end

  def show
    
    @team = Team.find_by(user_id: params[:id])
    render json: @team

  end

  def update

  end


end