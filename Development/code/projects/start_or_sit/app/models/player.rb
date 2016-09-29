class Player < ApplicationRecord




  def self.download(playerdata)

    playerdata.each do |player| 
      self.create(name: player['name'], player_id: player['id'], position: player['position'], team: player['teamAbbr'])
    end
  end

 
end
