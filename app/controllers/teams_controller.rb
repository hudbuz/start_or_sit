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
  
    if params['players']
    @team = Team.find_by(user_id: params[:id])
    @team.update_team(params['players'])
    render json: @team
    else 
      @team = Team.find_by(user_id: params[:id])
      @team.switch_player(params)
     
      render json: @team

   end
  end


end