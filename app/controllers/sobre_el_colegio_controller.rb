class SobreElColegioController < ApplicationController
  def inicio
  end

  def premios_y_distinciones
  end

  def historia
  end

  def autoridades
 
  end

  def asamblea
    respond_to do |format|
      format.js
    end
  end
end
