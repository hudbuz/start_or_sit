class PlayerSerializer < ActiveModel::Serializer
  attributes :player_id, :name, :team_name, :position, :esbid, :week_projected_points, :week_points, :season_projected_points, :season_points
  
end
