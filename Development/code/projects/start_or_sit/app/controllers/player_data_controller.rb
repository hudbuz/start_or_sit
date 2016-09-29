class PlayerDataController < ApplicationController


  def download

    @resp = Faraday.get 'http://api.fantasy.nfl.com/v1/players/stats?statType=seasonStats&season=2016&format=json'
    playerData = JSON.parse(@resp.body)
    Player.download(playerData['players'])
    binding.pry
  end


  def get_stats
    @resp = Faraday.get 'http://api.fantasy.nfl.com/v1/game/stats?format=json'
    statindex = JSON.parse(@resp.body)
    Index.set_index(statindex)
    binding.pry

  end




end