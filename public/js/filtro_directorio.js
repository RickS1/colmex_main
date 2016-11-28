docentes = clone(JSON.parse(gon.academicos));
agregarVisible(docentes);
data = crossfilter(docentes);
academicosPorNombre = data.dimension(function(d){ return d["nombre"]});
academicosPorCorreo = data.dimension(function(d){return d["correo"]});
academicosPorLinea = data.dimension(function(d){ return d["lineas_investigacion"]});
academicosPorCentro = data.dimension(function(d){ return d["adscripcion"]});


function filtrarDirectorio(){
	academicosPorNombre.filterAll();
	academicosPorCorreo.filterAll();
	academicosPorLinea.filterAll();
	academicosPorCentro.filterAll();
	var centrosAFiltrar = $("#contenido").val();
	var nombresAFiltrar = $("#nombre").val();
	var correosAFiltrar = $("#correo").val();
	var lineasAFiltrar = $("#linea").val();
	var academicosFiltradosPorCentro = academicosPorCentro.filter(function(d){ return ( centrosAFiltrar == "" ? true : d == centrosAFiltrar )}).top(Infinity);
	var academicosFiltradosPorNombre = academicosPorNombre.filter(function(d){ return (nombresAFiltrar == "" ? true : limpiarPuntuacion(d.toLowerCase()).indexOf(nombresAFiltrar.toLowerCase()) != -1)}).top(Infinity);
	var academicosFiltradosPorCorreo = academicosPorCorreo.filter(function(d){ return (correosAFiltrar == "" ? true : limpiarPuntuacion(d.toLowerCase()).indexOf(correosAFiltrar.toLowerCase()) != -1)}).top(Infinity);
	var academicosFiltradosPorLinea = academicosPorLinea.filter(function(d){ return ( lineasAFiltrar == "" ? true : limpiarPuntuacion(d.toLowerCase()).indexOf(lineasAFiltrar.toLowerCase()) != -1)}).top(Infinity);
	actualizarVisibleDirectorio(academicosFiltradosPorLinea);
	//renderFrase(academicosFiltradosPorLinea);
	//$("#wrapper").css({"height" : "auto", "padding-bottom" : "45px" });
	//$("#cutter-descubre").css("display","none");
}

function renderFrase(arreglo){
	uno_visible = false;
	var borrar_frase = (document.getElementById("frase-desc") != null && arreglo.length > 0);
	for(var i = 0; i < docentes.length; i++){
		if(docentes[i]["visible"]){
			uno_visible = true;
			break;
		}
	}
	if(!uno_visible){
		setTimeout(function(){
			$("#frase-desc").remove();
			$("#busqueda").append("<div id=\"frase-desc\">Ningún contenido coincide con su búsqueda.</div>");}, 850);
	}	
	else{
		$("#frase-desc").remove();
	}
}

function actualizarVisibleDirectorio(visibles){
	for(var i = 0; i < docentes.length; i++){
		docentes[i]["visible"] = false;
	}
	for(var i = 0; i < visibles.length; i++){
		docentes[visibles[i]["index"]]["visible"] = true;
	}
	reescalarDirectorio();
}

function reescalarDirectorio(){
	for(var i = 0; i < docentes.length; i++){
		$("#frame-"+i).css({"height": (descubres[i]["visible"] ? ajustarAlturas(i) : "0")/*, "width" : (descubres[i]["visible"] ? "" : 0), "border" : (descubres[i]["visible"] ? "solid 4px #fff" : "none") */});
	}
}

function limpiarPuntuacion(tags){
	var new_tags = tags.replace(/[íïîì]/i,"i");
	new_tags = new_tags.replace(/[áäâà]/i,"a");
	new_tags = new_tags.replace(/[éëêè]/i,"e");
	new_tags = new_tags.replace(/[óöôò]/i,"o");
	new_tags = new_tags.replace(/[úüûù]/i,"u");
	return new_tags;
}

function agregarVisible(doc){
	for(var i = 0; i < doc.length; i++){
		doc[i]["visible"] = true;
		doc[i]["index"] = i;
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
