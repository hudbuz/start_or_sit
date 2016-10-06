class PlayerSerializer < ActiveModel::Serializer
  attributes :player_id, :name, :team_name, :position, :esbid
  
end
