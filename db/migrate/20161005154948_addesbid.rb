class Addesbid < ActiveRecord::Migration[5.0]
  def change
    add_column :players, :esbid, :integer
  end
end
