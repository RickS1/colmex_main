class AddPositionsToSliders < ActiveRecord::Migration
  def change
    add_column :sliders, :pos_x, :float
    add_column :sliders, :pos_y, :float
  end
end
