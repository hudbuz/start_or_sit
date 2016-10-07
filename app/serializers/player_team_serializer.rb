class PlayerTeamSerializer < ActiveModel::Serializer
  attributes :id, :name, :player_id, :position, :team_name, :esbid
end
