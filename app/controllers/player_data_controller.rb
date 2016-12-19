class PlayerDataController < ApplicationController


  def download

    @resp = Faraday.get 'http://api.fantasy.nfl.com/v1/players/stats?statType=seasonStats&season=2016&format=json'
    playerData = JSON.parse(@resp.body)
    Player.download(playerData['players'])

  end


  def get_stats
    @resp = Faraday.get 'http://api.fantasy.nfl.com/v1/game/stats?format=json'
    statindex = JSON.parse(@resp.body)
    Index.set_index(statindex)


  end

  def update_stats
    @resp = Faraday.get 'http://api.fantasy.nfl.com/v1/players/stats?statType=seasonStats&season=2016&format=json'
    playerData = JSON.parse(@resp.body)
    Player.update_stats(playerData['players'])

  end

  def get_rank
  

  end




end
