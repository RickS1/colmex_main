module PrincipalHelper

  def construir_slider_eventos
    (slides = (@resultado.each.length / 4).ceil
    if slides == 0
      slides = 1
    end
    i = 1
    j = 0
    while i <= slides
      k = 1
      '<div class=' + (i==1 ? '"item active"' : '"item"') + '>'
      while k % 4 != 0
        '<div class="evento">'
        if j < @resultado.each.length
          @resultado.each[j]["tituloActividad"]
        end
        '</div>'
        k = k + 1
        j = j + 1
      end
      '</div>'
      i = i + 1 
    end).html_safe
  end
end
