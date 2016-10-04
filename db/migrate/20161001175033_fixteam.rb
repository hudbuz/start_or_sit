class Fixteam < ActiveRecord::Migration[5.0]
  def change
    rename_column :players, :team, :team_name

  end
end
