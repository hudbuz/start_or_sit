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
end
