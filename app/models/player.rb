class Player < ApplicationRecord
  has_many :team_players
  has_many :teams, through: :team_players



  def self.download(playerdata)
    binding.pry
    playerdata.each do |player|
    if player['esbid'] != false 
      self.create(name: player['name'], player_id: player['id'], position: player['position'], team_name: player['teamAbbr'], esbid: player['esbid'])
    else
        self.create(name: player['name'], player_id: player['id'], position: player['position'], team_name: player['teamAbbr']) 
    end

  end

 end

 def self.update_stats(playerdata)
  playerdata.each do |player|
    p = self.find_by(name: player['name'])
    if p != nil
      p.update(season_points: player['seasonPts'], season_projected_points: player['seasonProjectedPts'], week_projected_points: player['weekProjectedPts'], week_points: player['weekPts'])

    
    else 
      self.create(name: player['name'], player_id: player['id'], position: player['position'], team_name: player['teamAbbr'], season_points: player['seasonPts'], season_projected_points: player['seasonProjectedPts'], week_projected_points: player['weekProjectedPts'], week_points: player['weekPts'])
    end
  end
 end
end
