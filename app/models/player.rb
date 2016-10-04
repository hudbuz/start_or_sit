class Player < ApplicationRecord
  belongs_to :team



  def self.download(playerdata)

    playerdata.each do |player| 
      self.create(name: player['name'], player_id: player['id'], position: player['position'], team_name: player['teamAbbr'])
    end
  end

 
end
