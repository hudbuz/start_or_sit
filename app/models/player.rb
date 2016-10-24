class Player < ApplicationRecord


  has_many :team_players
  has_many :teams, through: :team_players

  @@current_week = 6

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
  binding.pry
  playerdata.each do |player|
    p = self.find_by(name: player['name'])
    if p != nil
      p.update(season_points: player['seasonPts'], season_projected_points: player['seasonProjectedPts'], week_projected_points: player['weekProjectedPts'], week_points: player['weekPts'])

    
    else 
      self.create(name: player['name'], player_id: player['id'], position: player['position'], team_name: player['teamAbbr'], season_points: player['seasonPts'], season_projected_points: player['seasonProjectedPts'], week_projected_points: player['weekProjectedPts'], week_points: player['weekPts'])
    end
  end
 end


 def self.get_D_rank(name)
  name = name.delete('@')
  players = Player.where(position: 'DEF').order('season_points DESC')
  rank = 0

  players.each_with_index do |team, index|
   
    
    if team.team_name == name
      rank = index + 1
    end

 end
 rank
end


end
