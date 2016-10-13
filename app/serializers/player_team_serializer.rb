class PlayerTeamSerializer < ActiveModel::Serializer
  attributes :id, :name, :player_id, :position, :team_name, :esbid, :week_projected_points, :week_points, :season_projected_points, :season_points
end
