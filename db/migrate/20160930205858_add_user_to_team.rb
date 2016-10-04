class AddUserToTeam < ActiveRecord::Migration[5.0]
  def change
    add_column :teams, :user_id, :integer
    add_column :teams, :name, :string
  end
end
