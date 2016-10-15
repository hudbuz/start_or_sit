class AddCurrentWeekToPlayers < ActiveRecord::Migration[5.0]
  def change

    add_column :players, :opponent, :string
  end
end
