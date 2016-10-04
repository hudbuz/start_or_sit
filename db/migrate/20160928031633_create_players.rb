class CreatePlayers < ActiveRecord::Migration[5.0]
  def change
    create_table :players do |t|
      t.string :name
      t.string :player_id
      t.string :position
      t.string :team


      t.timestamps
    end
  end
end
