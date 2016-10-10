class ProjectedPoints < ActiveRecord::Migration[5.0]
  def change

    add_column :players, :projected_points, :integer
    add_column :players, :season_points, :integer
  end
end
