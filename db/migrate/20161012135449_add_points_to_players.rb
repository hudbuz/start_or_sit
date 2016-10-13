class AddPointsToPlayers < ActiveRecord::Migration[5.0]
  def change
    remove_column :players, :projected_points
    add_column :players, :season_projected_points, :integer
    add_column :players, :week_projected_points, :integer
    add_column :players, :week_points, :integer

  end
end
