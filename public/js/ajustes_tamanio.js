ancho = Math.max(document.documentElement.clientWidth, window.innerWidth || document.body.ClientWidth || 0);
descubres = clone(JSON.parse(gon.descubres));
agregarVisible(descubres);
dataset = crossfilter(descubres);
descubresPorContenido = dataset.dimension(function(d){ return d.contenido; });
descubresPorTags = dataset.dimension(function(d){ return (d.titulo + " " + d.contenido + " " + d.tags.replace(/ *, */, " ")).replace(/ +/, " ").toLowerCase()});
num_filas = 2;
anchos_badges =[];

$(document).on('page:load', function(){ UIkit.init(); })

$(document).ready(function(){
	UIkit.init();

	var cw = $('.frame-descubre').width();

	if(gon.ev_tiny == ""){
		$("#div_eventos").css("height","0");
	}
	else{
		if(ancho < 785){ document.getElementById("render_eventos").innerHTML = gon.ev_tiny; }
		else if(ancho < 1150){ document.getElementById("render_eventos").innerHTML = gon.ev_small; }
		else{ document.getElementById("render_eventos").innerHTML = gon.ev_big;}
	}

	$('.frame-descubre').css({'height':cw+'px'});

	recabarAnchos();
	escalarSlider();
	partirDescubres();
	margenAuto();
	ajustarImagenes();
	$(document).trigger("scroll");
});

$(document).scroll(function() {
  var y = $(this).scrollTop();
  var ancho_act = Math.max(document.documentElement.clientWidth, window.innerWidth || document.body.ClientWidth || 0);
  if (y > 300) {
	$("#div_logo").css("display", "none");
	$("#div_menu").css("display", "none");
	$("#logo-main").css("display", "block");
	if(ancho_act > 1160){
	  $(".mail").css("width","60px");
	  $(".intranet").css("width","60px");	
	  $(".borrable").css("display","none");
	  $(".navbar-right").css("display","none");
	  $("#header-links").css({"display":"block", "background-color":"#E6E6E6", "color": "#7F7F7F", "font-size":"13px" });
	}
	else{
	  $(".mail").removeAttr("style");
	  $(".intranet").removeAttr("style");
	  $(".borrable").removeAttr("style");
	  $(".navbar-right").removeAttr("style");;
	  $("#header-links").css("display", "none");
	}
  } else {
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

$(window).on("orientationchange", function(){
	$(window).trigger("resize");
});

window.onresize = function(){

	var ancho_act = Math.max(document.documentElement.clientWidth, window.innerWidth || document.body.ClientWidth || 0);

	reescalarDescubre();

	if(ancho_act < 785 && ancho >= 785){
		document.getElementById("render_eventos").innerHTML = gon.ev_tiny;
		ancho = ancho_act;
	}
	else if(ancho_act < 1150 && (ancho >= 1150 || ancho <= 785)){
		document.getElementById("render_eventos").innerHTML = gon.ev_small;
		ancho = ancho_act;
	} 
	else if(ancho_act >= 1150 && ancho < 1150){
		document.getElementById("render_eventos").innerHTML = gon.ev_big;
		ancho = ancho_act;
	}

	escalarSlider();
	partirDescubres();
	margenAuto();
	ajustarImagenes();
	$(document).trigger("scroll");
}

function ajustarCuerpo(){
	var alto_footer = $('#div_footer').height();
	var alto_header = $('#header').height();
	$('#resto-cuerpo').css({'padding-bottom': alto_footer+'px', 'padding-top': alto_header+'px'});
}

function recabarAnchos(){
	for( var i = 0; i < gon.cant_sliders; i++){
		var image = new Image();
		image.src = $( "#badge-" + i).attr("src");
		var ancho_img = image.width;
		$( "#badge-" + i ).css("max-width", ancho_img);
		anchos_badges.push(ancho_img);
	}	
}

function escalarSlider(){
	var ancho_slide = $("#div_slider").width();
	var alto_slide = ancho_slide*(17/40);
	$('#div_slider').css({'height':alto_slide+'px'});
	$('.ghost-slider').css("height",alto_slide+"px");
	reajustarBadges();
}

function reajustarBadges(){
	for( var i = 0; i < gon.cant_sliders; i++){
		var ancho_nuevo = ($("#div_slider").width() * anchos_badges[i]) / 1341;
		$( "#badge-" + i ).css("width", ancho_nuevo);
	}
}

function partirDescubres(){
	var ancho_v = Math.max(document.documentElement.clientWidth, window.innerWidth || document.body.ClientWidth || 0);
	var json_l = descubres.length;
	var alto_d; 
	for( var i = 0; i < descubres.length; i++){
		if(descubres[i]["visible"]){
			alto_d = document.getElementById("frame-"+i).clientHeight;
			break;
		}
	}
	var div_filas = (ancho_v >= 1200 ? 5 : (ancho_v >= 992 ? 4 : (ancho_v >= 768 ? 3 : (ancho_v >= 480 ? 2 : 1))));
	var cantidad_filas = Math.ceil(descubres.length / div_filas);
	var altura_actual = alto_d * num_filas;
	var altura_real = alto_d * cantidad_filas;
	var altura_wrapper = document.getElementById("wrapper").clientHeight;

	$("#wrapper").css({"height" : ((altura_wrapper >= altura_real - 1) ? altura_real + "px" : altura_actual + "px") });

	altura_wrapper = document.getElementById("wrapper").clientHeight;
	if($("#wrapper").height() >= altura_real){
		$("#wrapper").css("height","auto");
	}

	if(((json_l > 10 && ancho_v >= 1200 ) || (json_l > 8 && ancho_v >= 992 && ancho_v < 1200) || (json_l > 6 && ancho_v >= 768 && ancho_v < 992) || (json_l >4 && ancho_v >= 480 && ancho_v < 768) || (json_l > 2 && ancho_v < 480)) && $("#cutter-descubre").css("display") != "none"){
		$("#cutter-descubre").css("display","block");
	}
	else{
		$("#cutter-descubre").css("display","none");
	}

}

function desbordarDescubres(){
	var ancho_v = Math.max(document.documentElement.clientWidth, window.innerWidth || document.body.ClientWidth || 0);
	if(document.getElementById("wrapper").style.height != "auto"){
		num_filas = num_filas + 2;
	}
	var alto_d; 
	for( var i = 0; i < descubres.length; i++){
		if(descubres[i]["visible"]){
			alto_d = document.getElementById("frame-"+i).clientHeight;
			break;
		}
	}
	var div_filas = (ancho_v >= 1200 ? 5 : (ancho_v >= 992 ? 4 : (ancho_v >= 768 ? 3 : (ancho_v >= 480 ? 2 : 1))));
	var cantidad_filas = Math.ceil(descubres.length / div_filas);
	var altura_actual = alto_d * num_filas;
	var altura_real = alto_d * cantidad_filas;
	var altura_wrapper = document.getElementById("wrapper").clientHeight;

	$("#wrapper").css({"height" : (($("#wrapper").height() + (alto_d * 2) > (alto_d * cantidad_filas) || document.getElementById("wrapper").style.height == "auto" ) ? altura_real + "px" : (alto_d * num_filas) + "px")});

	if($("#wrapper").height() >= altura_real){
		$("#wrapper").css("height","auto");
	}
	$("#cutter-descubre").css("display", $("#wrapper").height() + (alto_d * 2) >= altura_real  ? "none" : "block");

	margenAuto();
}

function margenAuto(){
	if(document.getElementById("cutter-descubre").style.display == "none"){
		$("#wrapper").css({"margin-bottom" : "45px", "height" : "auto" });
	}
}

function ajustarImagenes(){
	var ancho_izq = $("#col-izq").innerWidth();
	var ancho_ct = $("#col-ct").innerWidth();
	var ancho_der = $("#col-der").innerWidth();
	var img_izq = $("#img-pub").width();
	var img_pred = $("#img-pred-xs").width();
	var img_rev = $("#img-rev-xs").width();

	if(ancho_izq - 30 < img_izq){
		$("#img-pub").css("width","95%");
	}
	else{
		$("#img-pub").removeAttr("style");
	}
	if(window.innerWidth <= 768){
		if(ancho_ct - 30 < img_rev){
			$("#img-rev-xs").css("width","95%");
		}
		else{
			$("#img-rev-xs").removeAttr("style");
		}
		if(ancho_der - 30 < img_pred){
			$("#img-pred-xs").css("width","95%");
		}
		else{
			$("#img-pred-xs").removeAttr("style");
		}
	}
}



function clone(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

function agregarVisible(desc){
	for(var i = 0; i < desc.length; i++){
		desc[i]["visible"] = true;
		desc[i]["index"] = i;
	}
}
