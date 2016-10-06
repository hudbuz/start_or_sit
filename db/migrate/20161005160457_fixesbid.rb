class Fixesbid < ActiveRecord::Migration[5.0]
  def change
    remove_column :players, :esbid
    add_column :players, :esbid, :string
  end
end
