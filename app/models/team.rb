class Team < ApplicationRecord
  has_many :team_players
  has_many :players, through: :team_players
  belongs_to :user
end
