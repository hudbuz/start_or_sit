class TeamSerializer < ActiveModel::Serializer
  attributes :id, :user_id
  has_many :players, serializer: PlayerTeamSerializer
end
