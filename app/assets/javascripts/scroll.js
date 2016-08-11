$(document).scroll(function(event, value) {
  var y = value;
  var ancho_act = Math.max(document.documentElement.clientWidth, window.innerWidth || document.body.ClientWidth || 0);
  console.log(value);
  if ((y > 300 && window.innerHeight > 872) || (y > 150 && window.innerHeight <= 872)) {
	$(".reajustable").removeAttr("style");
	$("#contenedor_nav").css({"min-height":"60px","background-color":"#fff","-webkit-box-shadow":"0 6px 12px rgba(0,0,0,0.175)","-moz-box-shadow":"0 6px 12px rgba(0,0,0,0.175)","box-shadow":"0 6px 12px rgba(0,0,0,0.175)"});
	$("#barra_nav").css({"height":"100%","background-color":"#fff", "width":"85%","margin": "0 auto"});
	$("#div_logo").css("display", "none");
	$("#div_menu").css("display", "none");
	$(".reajustable").css("display","inline-block");
	$("#logo-main").css({"display":"block","padding-left":"50px"});
	if(ancho_act > 1160){
	  $(".mail").css("display","none");
	  $(".intranet").css("display","none");	
	  $(".borrable").css("display","none");
	  $(".navbar-right").css("display","none");
	  $("#header-links").css({"display":"inline-block", "background-color":"#fff", "padding-left":"50px","float":"left" });
	  $("#boton-top").css("display","block");
	}
	else{
	  if(ancho_act < 768){
	 	 $(".reajustable").css("width","100%");
	  }
	  else{
	  	 $(".reajustable").removeAttr("style");
	  }
	  $("#boton-top").css("display","block");
	  $("#logo-main").css("padding-left", "10px");
	  $(".uk-navbar-toggle").css({"line-height":"60px","padding":"0","float":"right", "margin-top":"0"});
	  $("#barra_nav").css("width","100%");
	  $(".mail").removeAttr("style");
	  $(".intranet").removeAttr("style");
	  $(".mail a").css("line-height","60px");
	  $(".intranet a").css("line-height","60px");
	  $(".borrable").removeAttr("style");
	  $(".navbar-right").removeAttr("style");;
	  $("#header-links").css("display", "none");
	}
  } else {
	$(".mail a").removeAttr("style");
	$(".intranet a").removeAttr("style");
	$("#boton-top").removeAttr("style");
	$(".reajustable").removeAttr("style");
	$(".uk-navbar-toggle").removeAttr("style");
	$("#contenedor_nav").removeAttr("style");
	$("#barra_nav").removeAttr("style");
	$(".reajustable").removeAttr("style");
	$("#logo-main").removeAttr("style");
	$("#div_logo").removeAttr("style");
	$("#div_menu").removeAttr("style");
	$(".borrable").removeAttr("style");
	$(".mail").removeAttr("style");
	$(".intranet").removeAttr("style");
	$(".navbar-right").removeAttr("style");
	$("#header-links").removeAttr("style");
  }
  ajustarCuerpo();
});

function ajustarCuerpo(){
	var alto_footer = document.getElementById('div_footer').clientHeight;
	var alto_header = document.getElementById('header').clientHeight;
	$('#resto-cuerpo').css({'padding-bottom': (alto_footer+1)+'px', 'padding-top': (alto_header-1.5)+'px'});
}

function regresarArriba(){
	$(document).scrollTop(0);
	$(document).trigger("scroll");
}
