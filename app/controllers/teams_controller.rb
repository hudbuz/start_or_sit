class TeamsController < ApplicationController



  def index

  end



  def create
   
  end

  def show
    
    @team = Team.find_by(user_id: params[:id])
    render json: @team

  end

  def update
    binding.pry
    @team = Team.find(params['lineup']['id'])
    @team.update_team(params)
    binding.pry

    render json: @team

  end


end