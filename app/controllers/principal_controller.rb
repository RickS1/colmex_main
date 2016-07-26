class PrincipalController < ApplicationController
  def principal
    begin
      cliente = TinyTds::Client.new username: 'agendaPRED', password: '@g3NDa#', host: '172.16.40.169', port: '49435'
      @resultado = cliente.execute("USE Agenda")
      @resultado.do
      @resultado = cliente.execute("SELECT * from dbo.vw_DatosAgenda")
      gon.ev_big, gon.ev_small, gon.ev_tiny = construye_slider_eventos(@resultado)
    rescue
      gon.ev_big, gon.ev_small, gon.ev_tiny = "", "" ,""
    end
    @sliders = Slider.where("fecha_expiracion > ? ", Date.current()).order("RAND()")
    @descubre = Descubre.where("fecha_publicacion <= ? AND fecha_limite_pub > ?", Date.current(), Date.current()).order("RAND()")
    @frase = Frase.order("RAND()").first
  end

  def resultados_busqueda
    @resultados = []
    condicion_limpia = quitar_acentos(params[:condicion]).downcase
    Descubre.all.each do |d|
      if (quitar_acentos(d.titulo.downcase).include?(condicion_limpia) or quitar_acentos(d.tags.downcase).gsub(/ *, */, " ").include?(condicion_limpia)) and not @resultados.include?(d)
        @resultados << d
      end
    end
    Curso.all.each do |c|
      if (quitar_acentos(c.titulo.downcase).include?(condicion_limpia) or quitar_acentos(c.descripcion.downcase).include?(condicion_limpia) or quitar_acentos(c.programa.downcase).include?(condicion_limpia) or (quitar_acentos(c.programa).downcase == "curso" and quitar_acentos(c.tipo_curso).downcase.include?(condicion_limpia)) or quitar_acentos(c.tags.downcase).gsub(/ *, */, " ").include?(condicion_limpia)) and not @resultados.include?(c)
        @resultados << c
      end
    end
  end

  def quitar_acentos(cadena)
    nueva_cad = cadena.gsub(/[áÁ]/, "a")
    nueva_cad = nueva_cad.gsub(/[éÉ]/, "e")
    nueva_cad = nueva_cad.gsub(/[íÍ]/, "i")
    nueva_cad = nueva_cad.gsub(/[óÓ]/, "o")
    nueva_cad = nueva_cad.gsub(/[úÚ]/, "u")
    return nueva_cad
  end

  def principios_eticos
 
  end
end
