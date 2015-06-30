class CreateMembers < ActiveRecord::Migration
  def change
    create_table :members do |t|
      t.string :email
      t.string :username
      t.string :password
      t.integer :range, default: 1
      t.timestamps null: false
    end
  end
end
