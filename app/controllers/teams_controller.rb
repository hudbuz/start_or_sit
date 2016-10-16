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
    if params['lineup']
    @team = Team.find(params['lineup']['id'])
    @team.update_team(params)
    render json: @team
    else 
      @team = Team.find_by(user_id: params[:id])
      @team.switch_player(params)
      render json: @team

   end
  end


end