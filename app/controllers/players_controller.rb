class PlayersController < ApplicationController

  def index

    @players = Player.all.offense

    render json: @players


  end


  def show


    if params[:id].to_i == 0

      @rank = Player.get_D_rank(params[:id])

      render json: @rank
    else
      @player = Player.find(params[:id])
      render json: @player
    end

  end





end
