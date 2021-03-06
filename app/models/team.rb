class Team < ApplicationRecord
  has_many :team_players
  has_many :players, through: :team_players
  belongs_to :user


  def update_team(data)

    @qb = Player.find_by(name: data['qb']['name'])
    @rb = Player.find_by(name: data['rb']['name'])
    @wr = Player.find_by(name: data['wr']['name'])
    @te = Player.find_by(name: data['te']['name'])
    @k = Player.find_by(name: data['k']['name'])
    @def = Player.find_by(name: data['def']['name'])

    TeamPlayer.create(player_id: @qb.id, team_id: self.id)
    TeamPlayer.create(player_id: @rb.id, team_id: self.id)
    TeamPlayer.create(player_id: @wr.id, team_id: self.id)
    TeamPlayer.create(player_id: @te.id, team_id: self.id)
    TeamPlayer.create(player_id: @k.id, team_id: self.id)
    TeamPlayer.create(player_id: @def.id, team_id: self.id)

    self.save

  end


  def switch_player(data)


    new_player = Player.find_by(name: data['name'])
    self.team_players.where(player_id: self.players.where(position: data['position'])[0].id).update(player_id: new_player.id)



  end

  def order_by
  end
end
