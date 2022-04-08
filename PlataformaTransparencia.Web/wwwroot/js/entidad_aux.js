﻿inicializaDatos();
var pestaniaSeleccionada = 1;
GraficaSankey();

function seleccionoAnio(sel) ***REMOVED***
  var anio = sel.options[sel.selectedIndex].text;
  GetConsolidadoProgramas(anio);
  //console.log("Pestaña seleccionada");
  //console.log(pestaniaSeleccionada);
  ObtenerActividades(pestaniaSeleccionada);
***REMOVED***


function inicializaDatos() ***REMOVED***
  
  var selectAnio = document.getElementById("annioEntidad");
  var anioEntidad = selectAnio.options[selectAnio.selectedIndex].text;
  GetConsolidadoProgramas(anioEntidad);
  if (pestaniaSeleccionada == undefined) pestaniaSeleccionada = 1;
  ObtenerActividades(pestaniaSeleccionada);
***REMOVED***

function ObtenerActividades(tipoPrograma) ***REMOVED***
   //string tipoPrograma, string anioEntidad, string codEntidad
  pestaniaSeleccionada = tipoPrograma;
  var codigoEntidad = document.getElementById("codigoEntidadId").innerHTML;
  var selectAnio = document.getElementById("annioEntidad");
  var anioEntidad = selectAnio.options[selectAnio.selectedIndex].text;
  if (tipoPrograma == 1 || tipoPrograma == 3) ***REMOVED***
    var tipoProgramaConsultar = "CENTRAL";
    if (tipoPrograma == 3) ***REMOVED***
      tipoProgramaConsultar = "NO ASIGNABLE";
***REMOVED***
    var loading = document.getElementById("loading");
    var pestaniaResultado = document.getElementById("contenidoActividades");
    loading.style.display = "block";
    pestaniaResultado.style.display = "none";
    $.ajax(***REMOVED***
      url: "api/serviciosentidad/GetActividadesPlan/",
      type: "GET",
      data: ***REMOVED***
        tipoPrograma: tipoProgramaConsultar,
        anioEntidad: anioEntidad,
        codEntidad: codigoEntidad
    ***REMOVED***

***REMOVED***).done(function (data) ***REMOVED***
      pestaniaResultado.innerHTML = ""
      if (data.length > 0) ***REMOVED***
        pestaniaResultado.innerHTML = GetTituloProyectosActividad(); //Queda abierto 1 div activities
        for (var i = 0; i < data.length; i++) ***REMOVED***
          var nuevoEncabezadoProyectoAct = GetEncabezadoProyectosActividad(data[i]); //Quedan abiertos 2 divs: card-body y card h-100
          var indicadoresProyectoAct = GetIndicadoresProyectosActividad(data[i], i); //Falta cerrar 3 divs . Dentro de GetIndicadoresProyectosActividad todos los divs se cierran
          pestaniaResultado.innerHTML = pestaniaResultado.innerHTML + nuevoEncabezadoProyectoAct + indicadoresProyectoAct + '</div>';//Cierro el div del card body. Falta cerrar 2 divs
          pestaniaResultado.innerHTML = pestaniaResultado.innerHTML + '</div>';//Cierro el div del card h-100. Falta cerrar 1 div
    ***REMOVED***
        pestaniaResultado.innerHTML = pestaniaResultado.innerHTML + '</div>';//Cierro el div del activities
        pestaniaResultado.style.display = "block";
  ***REMOVED***
      loading.style.display = "none";
***REMOVED***).fail(function (handleError) ***REMOVED***
      // Some function
      loading.style.display = "none";
      pestaniaResultado.innerHTML = "";
      pestaniaResultado.style.display = "block";
***REMOVED***);
  ***REMOVED***
  else if (tipoPrograma == 2) ***REMOVED***
    //console.log("Entrando a tipo programa 2");
    var tipoProgramaConsultar = "SUSTANTIVO";
    var loading = document.getElementById("loading");
    var pestaniaResultado = document.getElementById("contenidoActividades");
    loading.style.display = "block";
    pestaniaResultado.style.display = "none";
    $.ajax(***REMOVED***
      url: "api/serviciosentidad/GetActividadesProgramaSustantivo/",
      type: "GET",
      data: ***REMOVED***
        tipoPrograma: tipoProgramaConsultar,
        anioEntidad: anioEntidad,
        codEntidad: codigoEntidad
    ***REMOVED***

***REMOVED***).done(function (data) ***REMOVED***
      pestaniaResultado.innerHTML = ""
      if (data.length > 0) ***REMOVED***
        pestaniaResultado.innerHTML = pestaniaResultado.innerHTML + '<div class="tabs-item">';
        for (var w = 0; w < data.length; w++) ***REMOVED***
          pestaniaResultado.innerHTML = pestaniaResultado.innerHTML +
            '<div class="tabs-item active activities">' +
              '<div class="card h-100" style="background-color: #30536E;">' +
                '<p style="color:white; padding-left:15px; padding-top:15px;">Programa:</p>' +
                '<div class="banner-main-title" style="padding-left: 15px;"><h2>' + data[w].nombrePrograma + '</h2></div>' +
            '</div>' +
            '<div class="card h-100">' +
              '<div class="card-body">' +
                '<div class="row">' +
                  '<div class="col-lg-4 align-self-center">' +
                    '<div class="h6">Asignación Financiera</div>' +
            '<span class="h3">₲ ' + data[w].presupuestoAsignado.formatMoney(0, ',', '.') + 'Millones</span>' +
                  '</div>' +
                  '<div class="col-lg-8 align-self-center">' +
                    '<div class="h6">Resultado Intermedio</div>' +
                      '<p>' + data[w].resultadoIntermedio + '</p>' +
              //'<div class="h6">Resultado Inmediato <i class="material-icons md-12">help</i> </div>' +
              //'<p>' + data[w].resultadoInmediato + '</p>' +
              '<div class="h6">Problemática</div>' +
              '<p>' + data[w].problematica + '</p>' +
              '</div>' +
              '</div>' +
              '</div>' +
            '</div>';

          if (data[w].proyectos != undefined && data[w].proyectos.length > 0) ***REMOVED***
            var encabezadoProyecto = '<div class="tabs-item active activities">' +
              '<h3 class="mb-5">Actividades/Proyectos presupuestarios</h3>';
            var cuerpoProyecto = '';

            for (var j = 0; j < data[w].proyectos.length; j++) ***REMOVED***
              cuerpoProyecto = cuerpoProyecto +
                '<div class="card h-100">' +
                  '<div class="card-title">' +
                    '<div class="row">' +
                      '<div class="col-lg-9 col-md-8">' +
                          '<h4 class="">' + data[w].proyectos[j].nombreProyectoActividad + '</h4>' +
                          '<span class="badge rounded-pill Outlinetag" style="color: black;">' + data[w].proyectos[j].clasificacion + '</span>' +
                      '</div>' +
                    '</div>' +
                  '</div>' +
                  '<div class="card-body">' +
                    '<div class="row mb-4">' +
                      '<div class="col-lg-6">'+
                        '<span class="h5">Resultado inmediato:</span><br />' +
                        '<p>' + data[w].proyectos[j].descripcion + '</p>' +
                      '</div>' +
                      '<div class="col-6 col-lg-3">' +
                        '<span class="h5"> Monto total actividad </span><br />' +
                        '<span class="h3">₲' + data[w].proyectos[j].presupuestoVigente.formatMoney(0, ',', '.') + 'Millones</span>' +
                      '</div>' +
                      '<div class="col-6 col-lg-3">'+
                        '<span class="h5">Avance</span><br/>'+
                '<span class="h3">₲' + data[w].proyectos[j].presupuestoAvance.formatMoney(0, ',', '.') + 'Millones</span>' +
                       '</div>' +
                '</div>';
              var encabezadoIndicadoresProyecto = '';
              if (data[w].proyectos[j].indicadores != undefined && data[w].proyectos[j].indicadores.length > 0) ***REMOVED***
                encabezadoIndicadoresProyecto = '<div class="row">' +
                  '<div class="col-lg-12">' +
                  '<div class="mb-3"><span class="h6">Indicadores</span></div>' +
                  '</div>';
                var encabezadoUlIndicadores = '<div class="row"><div class="col-lg-12"><ul class="accordion-list">';
                var piePaginaUlIndicadores = '</ul></div></div>';
                var cuerpoIndicadoresProyecto = '';
                  for (var v = 0; v < data[w].proyectos[j].indicadores.length; v++) ***REMOVED***
                      var desc_aux = data[w].proyectos[j].indicadores[v].DescripcionPoblTotal;
                      if (desc_aux == null || desc_aux == undefined) ***REMOVED***
                          //desc_aux = "Sin información disponible";
                          desc_aux = "";
                  ***REMOVED***
                    //aquiiiiiii2
                  cuerpoIndicadoresProyecto = cuerpoIndicadoresProyecto +
                    '<li id=indicador' + w + "_" + j + "_" + v + ' class="accordion-item">' +
                        '<div id=indicadorHeader' + w + "_" + j + "_" + v + ' class="accordion-trigger" onclick=MostrarIndicadorSustantivo(' + w + ',' + j + ',' + v + ',' + data[w].proyectos[j].indicadores[v].codigo + ')>' +
                      '<span class="name-indicator labelIndiNombre">' + data[w].proyectos[j].indicadores[v].codigo + '-' + data[w].proyectos[j].indicadores[v].nombre + '</span>' +
                        '</div>' +
                      '<div id=indicadorcontent' + w + "_" + j + "_" + v + ' class="accordion-content content">' +
                      '<div class="row data-entidad">' +
                      '<div class="col-lg-7">' +
                      '<small class="text-bold labelIndiTexto">Fórmula</small>' +
                      '<p class="labelIndiValor">' + data[w].proyectos[j].indicadores[v].descripcion + '</p>' +
                      '</div>' +
                      '<div class="col-lg-5">' +
                      '<small class="text-bold labelIndiTexto">Frecuencia</small>' +
                      '<p class="labelIndiValor">' + data[w].proyectos[j].indicadores[v].ind_frecuen + '</p>' +
                      '</div>' +
                      '</div>' +
                      '<div class="row data-entidad">' +
                      '<div class="col-lg-5">' +
                      '<small class="text-bold labelIndiTexto">Tipo Indicador</small>' +
                      '<p labelIndiValor>' + data[w].proyectos[j].indicadores[v].tipoIndicador + '</p>' +
                      '</div>' +
                      '<div class="col-lg-5">' +
                      '<small class="text-bold labelIndiTexto">Nivel</small>' +
                      '<p class="labelIndiValor">' + data[w].proyectos[j].indicadores[v].nivel + '</p>' +
                      '</div>' +
                      '</div>' +
                      '<div class="row data-entidad">' +
                      '<div class="col-lg-5">' +
                      '<small class="text-bold labelIndiTexto">Descripción Población</small>' +
                      '<p class="labelIndiValor">' + desc_aux + '</p>' +
                      '</div>' +
                      '<div class="col-lg-5">' +
                      '<small class="text-bold labelIndiTexto">Año Base</small>' +
                      '<p class="labelIndiValor">' + data[w].proyectos[j].indicadores[v].indAnioBase + '</p>' +
                      '</div>' +
                      '</div>' +
                      '<div class="row data-entidad">' +
                      '<div class="col-lg-12">' +
                      '<div class="TableGraphIndicador table-responsive" id="TableGraphIndicadorSus' + + w + "_" + j + "_" + v + '"></div>' +
                      '</div>' +
                      '</div>' +
                      '<div class="row data-entidad">' +
                      '<div class="col-lg-12">' +
                      '<div id="loading_' + w + "_" + j + "_" + v + '" class="tabs-container" style="display:none">' +
                      '<h5>Generando gráfica...</h5>' +
                      '</div>' +
                      '<div style="width:auto; min-height:400px;display:block;" id="graphIndicador' + w + "_" + j + "_" + v + '">' +
                      '</div>' +
                      '</div>' +
                      '</div>' +
                      '</div>' +
                      '</li>';
            ***REMOVED***
                encabezadoIndicadoresProyecto = encabezadoIndicadoresProyecto + encabezadoUlIndicadores + cuerpoIndicadoresProyecto + piePaginaUlIndicadores + "</div>";
          ***REMOVED***
              cuerpoProyecto = cuerpoProyecto + encabezadoIndicadoresProyecto +
                 '</div>'+
                '</div>';
        ***REMOVED***
            encabezadoProyecto = encabezadoProyecto + cuerpoProyecto +
             /* '</div>' +*/
              '</div>';
            pestaniaResultado.innerHTML = pestaniaResultado.innerHTML + encabezadoProyecto + '</div>';
      ***REMOVED***
    ***REMOVED***
        pestaniaResultado.innerHTML = pestaniaResultado.innerHTML + '</div>';
   ***REMOVED***
      loading.style.display = "none";
      pestaniaResultado.style.display = "block";
***REMOVED***).fail(function (handleError) ***REMOVED***
      // Some function
      pestaniaResultado.innerHTML = '';
      loading.style.display = "none";
      pestaniaResultado.style.display = "block";
***REMOVED***);
  ***REMOVED***
***REMOVED***

function GetTituloProyectosActividad() ***REMOVED*** 
  var sal = '<div class="tabs-item active activities">' +
    '<h3 class="mb-5" >Actividades/Proyectos presupuestarios</h3 >';
  return sal; //falta cerrar 1 div
***REMOVED***

function GetEncabezadoProyectosActividad(registroProyecto) ***REMOVED***
  return '<div class="card h-100">' +
            '<div class="card-title">' +
              '<div class="row">' +
                '<div class="col-lg-9 col-md-8">' +
                  '<h4 class="">' + registroProyecto.nombreProyectoActividad + '</h4>' +
                  '<span class="badge rounded-pill Outlinetag" style="color: black;">' + registroProyecto.clasificacion + '</span>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="card-body">' +
              '<div class="row mb-4">' +
                '<div class="col-lg-6">' +
                  '<span class="h5">Resultado inmediato:</span><br/>' +
                  '<p>' + registroProyecto.descripcion + '</p>' +
                '</div>' +
                '<div class="col-6 col-lg-3">' +
                  '<span class="h5">' + 'Monto total actividad' + '</span><br/>' +
                  '<span class="h3">₲' + registroProyecto.presupuestoVigente.formatMoney(0, ',', '.') + 'Millones</span>' +
                '</div>' +
                '<div class="col-6 col-lg-3">' +
                  '<span class="h5">Avance</span><br/>' +
                  '<span class="h3">₲ ' + registroProyecto.presupuestoAvance.formatMoney(0, ',', '.') + 'Millones</span>' +
                '</div>' +
              '</div>';//Quedan abiertos dos divs: card-body y card h-100
***REMOVED***

function GetIndicadoresProyectosActividad(registroProyecto, i) ***REMOVED***
  var indicadoresProyActividad = "";
  if (registroProyecto.indicadores != undefined && registroProyecto.indicadores.length > 0) ***REMOVED***
    indicadoresProyActividad =
      '<div class="row">' +
      '<div class="col-lg-12">' +
      '<div class="mb-3">' +
      '<span class="h6"> Indicadores</span>' +
      '</div>' +
      '</div>'; //Falta cerrar 1 div
    var encabezadoUlIndicadores = '<div class="row">' +
      '<div class="col-lg-12">' +
      '<ul class="accordion-list">'; //Falta cerrar 3 divs (1 viene del título indicadores)

    var datosIndicadores = '';
    for (var j = 0; j < registroProyecto.indicadores.length; j++) ***REMOVED***
      var desc_aux = registroProyecto.indicadores[j].DescripcionPoblTotal;
      if (desc_aux == null || desc_aux == undefined) ***REMOVED***
        desc_aux = "";
  ***REMOVED***
      datosIndicadores = datosIndicadores +
        '<li id=indicador' + i + "_" + j + ' class="accordion-item">' +
        '<div id=indicadorHeader' + i + "_" + j + ' class="accordion-trigger" onclick=MostrarIndicador(' + i + ',' + j + ',' + registroProyecto.indicadores[j].codigo + ')>' +
        '<span class="name-indicator labelIndiNombre">' + registroProyecto.indicadores[j].codigo + '-' + registroProyecto.indicadores[j].nombre + '</span>' +
        '</div>' +
        '<div id=indicadorcontent' + i + "_" + j + ' class="accordion-content content">' +
        '<div class="row data-entidad">' +
        '<div class="col-lg-7">' +
        '<small class="text-bold labelIndiTexto">Fórmula</small>' +
        '<p class="labelIndiValor">' + registroProyecto.indicadores[j].descripcion + '</p>' +
        '</div>' +
        '<div class="col-lg-5">' +
        '<small class="text-bold labelIndiTexto">Frecuencia</small>' +
        '<p class="labelIndiValor">' + registroProyecto.indicadores[j].ind_frecuen + '</p>' +
        '</div>' +
        '</div>' +
        '<div class="row data-entidad">' +
        '<div class="col-lg-5">' +
        '<small class="text-bold labelIndiTexto">Tipo Indicador</small>' +
        '<p labelIndiValor>' + registroProyecto.indicadores[j].tipoIndicador + '</p>' +
        '</div>' +
        '<div class="col-lg-5">' +
        '<small class="text-bold labelIndiTexto">Nivel</small>' +
        '<p class="labelIndiValor">' + registroProyecto.indicadores[j].nivel + '</p>' +
        '</div>' +
        '</div>' +
        '<div class="row data-entidad">' +
        '<div class="col-lg-5">' +
        '<small class="text-bold labelIndiTexto">Descripción Población</small>' +
        '<p class="labelIndiValor">' + desc_aux + '</p>' +
        '</div>' +
        '<div class="col-lg-5">' +
        '<small class="text-bold labelIndiTexto">Año Base</small>' +
        '<p class="labelIndiValor">' + registroProyecto.indicadores[j].indAnioBase + '</p>' +
        '</div>' +
        '</div>' +
        '<div class="row data-entidad">' +
        '<div class="col-lg-12">' +
        '<div class="TableGraphIndicador table-responsive" id="TablegraphIndicador_' + i + "_" + j + '"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row data-entidad">' +
        '<div class="col-lg-12">' +
        '<div id="loading' + i + "_" + j + '" class="tabs-container" style="display:none">' +
        '<h5>Generando gráfica...</h5>' +
        '</div>' +
        '<div style="width:auto; min-height:400px; display:block;" id="graphIndicador' + i + "_" + j + '">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</li>';
***REMOVED***
    var piePaginaUlIndicadores = '</ul></div></div>';//Se cierra el div antes del ul-accordion
    indicadoresProyActividad = indicadoresProyActividad +
      encabezadoUlIndicadores +
      datosIndicadores + piePaginaUlIndicadores + '</div>'; //Se cierran todos los divs
  ***REMOVED***
  return indicadoresProyActividad; //Devuelve los datos con todos los divs de la función cerrrados
***REMOVED***


function MostrarIndicador(i, j, codigoIndicador) ***REMOVED***
  var liIndicador = document.getElementById("indicadorcontent" + i + "_" + j);
  if (liIndicador.style.display == "block") liIndicador.style.display = "none";
  else ***REMOVED***
    var codigoEntidad = document.getElementById("codigoEntidadId").innerHTML;
    var selectAnio = document.getElementById("annioEntidad");
    var anioEntidad = selectAnio.options[selectAnio.selectedIndex].text;
    var loading = document.getElementById("loading" + i + "_" + j);
    loading.style.display = "block";
    $.ajax(***REMOVED***
      url: "api/serviciosentidad/GetGraficaIndicadores/",
      type: "GET",
      data: ***REMOVED***
        codIndicador: codigoIndicador,
        anio: anioEntidad,
        codEntidad: codigoEntidad
    ***REMOVED***
***REMOVED***).done(function (data) ***REMOVED***
 
        if (data.length > 0) ***REMOVED***
            //pinta tabla
            var idTabla = "TablegraphIndicador_" + i + "_" + j;
            var idBarGrafica = "graphIndicador" + i + "_" + j;
            var str = "";
            str += '<table class="table">';
            str += '<thead>';
            str += '<tr>';
            str += '<th scope="col">Año</th>';
            str += '<th scope="col">Meta Numerador</th>';
            str += '<th scope="col">Denominador</th>';
            str += '<th scope="col">Avance Numerador</th>';
            str += '</tr>';
            str += '</thead>';
            str += '<tbody>';

            for (var k = 0; k < data.length; k++) ***REMOVED***
                str += '<tr>';
                str += '<td>';
                str += data[k].anio;
                str += '</td>';
                str += '<td>';
                str += data[k].meta_numerador;
                str += '</td>';
                str += '<td>';
                str += data[k].denominador;
                str += '</td>';
                str += '<td>';
                str += data[k].avance_numerador;
                str += '</td>';
                str += '</tr>';
        ***REMOVED***
            str += ' </tbody>';
            str += '</table>';

            if ($("#" + idTabla).length > 0) ***REMOVED***
                $("#" + idTabla).html(str);
        ***REMOVED***
            
            loadBarChartIndicadores(data, idBarGrafica);
  ***REMOVED***
        else ***REMOVED***
            $("#graphIndicador" + i + "_" + j).hide();
            //$("#graphIndicador" + i + "_" + j).html("<p>No hay información para construir la gráfica de este indicador</p>");
  ***REMOVED***
      loading.style.display = "none";
     

***REMOVED***).fail(function (handleError) ***REMOVED***
      loading.style.display = "none";    
***REMOVED***);
    liIndicador.style.display = "block";

  ***REMOVED***
***REMOVED***


function loadBarChartIndicadores(objData, divContenedor) ***REMOVED***
    var data = [];
    var colores = ***REMOVED***
        "meta": "#4281A4",
        "avance": "#99c0d6"
***REMOVED***;
    if ($("#" + divContenedor).length > 0) ***REMOVED***
        $("#" + divContenedor).empty();
        var str_legend = '<div class="convenciones">';
        str_legend += '<div class="row">';
        str_legend += '<div class="row">';
        str_legend += '<div class="col-lg-4">';
        str_legend += '<div class="wrap-convencion">';
        str_legend += '<span class="colorbox-demo c1"></span>';
        str_legend += '<span class="label">% Meta del Id</span>';
        str_legend += '</div>';
        str_legend += '</div>';
        str_legend += '<div class="col-lg-4">';
        str_legend += '<div class="wrap-convencion">';
        str_legend += '<span class="colorbox-demo c2"></span>';
        str_legend += '<span class="label">% Avance del Id </span>';
        str_legend += '</div>';
        str_legend += '</div>';
        str_legend += '</div>';
        str_legend += '</div>';

        $("#" + divContenedor).append(str_legend);
        
        if (objData != undefined && objData != null) ***REMOVED***
            for (var cont = 0; cont < objData.length; cont++) ***REMOVED***
                var porc_meta = (objData[cont].porc_meta * 100).toFixed(2);
                var porc_avance = (objData[cont].porc_avance * 100).toFixed(2);

                var aux_meta = ***REMOVED*** id: "meta", x: objData[cont].anio, y: porc_meta ***REMOVED***;
                data.push(aux_meta);
                var aux_avance = ***REMOVED*** id: "avance", x: objData[cont].anio, y: porc_avance ***REMOVED***;
                data.push(aux_avance);
        ***REMOVED***

            if (data.length > 0) ***REMOVED***
                new d3plus.BarChart()
                    .select("#" + divContenedor)
                    .config(***REMOVED***
                        data: data,
                        shapeConfig: ***REMOVED***
                            label: false,
                            labelConfig: ***REMOVED***
                                fontMin: 4,
                                fontMax: 8
                          ***REMOVED***
                            fill: function (d) ***REMOVED***
                                return colores[d["id"]];
                        ***REMOVED***

                      ***REMOVED***
                        tooltipConfig: ***REMOVED***
                            title: function (d) ***REMOVED***
                                var cad = '<p style="text-align:center;">' + d["id"].substr(0, 1).toUpperCase() + d["id"].substr(1) + '</p>';
                                return cad;
                          ***REMOVED***
                            tbody: [
                                ["Porcentaje", function (d) ***REMOVED*** return d["y"] + "%" ***REMOVED***]
                            ]
                      ***REMOVED***
                        yConfig: ***REMOVED***
                            title: "",
                            tickFormat: function (d) ***REMOVED***
                                return (d) + " %";
                        ***REMOVED***
                      ***REMOVED***
                        xConfig: ***REMOVED***
                            fontsize: "2px",
                            size: "2px"
                      ***REMOVED***
                        legend: false,
                        xSort: function (a, b) ***REMOVED***
                            return a["x"] - b["x"];
                    ***REMOVED***
                ***REMOVED***)
                    .barPadding(0)
                    .groupPadding(40)
                    .render();

        ***REMOVED***

    ***REMOVED***

***REMOVED***
   


***REMOVED***


function MostrarIndicadorSustantivo(programa, proyecto, indicador,codigoIndicador) ***REMOVED***
  /*console.log("Entre a esta gráfica");*/
  var liIndicador = document.getElementById("indicadorcontent" + programa + "_" + proyecto + "_" + indicador);
    if (liIndicador.style.display == "block") liIndicador.style.display = "none";
    else ***REMOVED***
        var codigoEntidad = document.getElementById("codigoEntidadId").innerHTML;
        var selectAnio = document.getElementById("annioEntidad");
        var anioEntidad = selectAnio.options[selectAnio.selectedIndex].text;
        var loading = document.getElementById("loading_" + programa + "_" + proyecto + "_" + indicador);

        loading.style.display = "block";


        $.ajax(***REMOVED***
            url: "api/serviciosentidad/GetGraficaIndicadores/",
            type: "GET",
            data: ***REMOVED***
                codIndicador: codigoIndicador,
                anio: anioEntidad,
                codEntidad: codigoEntidad
          ***REMOVED***
    ***REMOVED***).done(function (data) ***REMOVED***
            if (data.length > 0) ***REMOVED***
                //pinta tabla
                var idTabla = "TableGraphIndicadorSus" + programa + "_" + proyecto + "_" + indicador;
                var idBarGraph = "graphIndicador" + programa + "_" + proyecto + "_" + indicador;
                var str = "";
                str += '<table class="table">';
                str += '<thead>';
                str += '<tr>';
                str += '<th scope="col">Año</th>';
                str += '<th scope="col">Meta Numerador</th>';
                str += '<th scope="col">Denominador</th>';
                str += '<th scope="col">Avance Numerador</th>';
                str += '</tr>';
                str += '</thead>';
                str += '<tbody>';

                for (var k = 0; k < data.length; k++) ***REMOVED***
                    str += '<tr>';
                    str += '<td>';
                    str += data[k].anio;
                    str += '</td>';
                    str += '<td>';
                    str += ConvertirNumeroNotacionPais('es-PY', data[k].meta_numerador,2);
                    str += '</td>';
                    str += '<td>';
                    str += ConvertirNumeroNotacionPais('es-PY', data[k].denominador, 2);
                    str += '</td>';
                    str += '<td>';
                    str += ConvertirNumeroNotacionPais('es-PY', data[k].avance_numerador, 2); 
                    str += '</td>';
                    str += '</tr>';
            ***REMOVED***
                str += ' </tbody>';
                str += '</table>';

                if ($("#" + idTabla).length > 0) ***REMOVED***
                    $("#" + idTabla).html(str);
            ***REMOVED***

                loadBarChartIndicadores(data, idBarGraph)
        ***REMOVED***
            else ***REMOVED***
                $("#graphIndicador" + programa + "_" + proyecto + "_" + indicador).hide();
                //$("#graphIndicador" + programa + "_" + proyecto + "_" + indicador).html("<p>No hay información para construir la gráfica de este indicador</p>");
        ***REMOVED***
            loading.style.display = "none";
    ***REMOVED***).fail(function (handleError) ***REMOVED***
            loading.style.display = "none";
    ***REMOVED***);
        //  loading.style.display = "none";
        liIndicador.style.display = "block";
***REMOVED***
***REMOVED***

function ConvertirNumeroNotacionPais(localCulture, n, d) ***REMOVED***
  var opts = ***REMOVED*** minimumFractionDigits: d ***REMOVED***;
  return n.toLocaleString(localCulture, opts);
***REMOVED***;

function GetConsolidadoProgramas(anio) ***REMOVED***
  var codigoEntidad = document.getElementById("codigoEntidadId").innerHTML;
  var anioEntidad = anio;
  $.ajax(***REMOVED***
    url: "api/serviciosentidad/GetConsolidadoProgramasXCodEntidadAnio/",
    type: "GET",
    data: ***REMOVED***
      anio: anioEntidad,
      codEntidad: codigoEntidad
  ***REMOVED***

  ***REMOVED***).done(function (data) ***REMOVED***
    //console.log("data:");
    //console.log(data);
    
    var actividadesProgramaCentral = document.getElementById("totalActividadesProgramaCentral");
    actividadesProgramaCentral.innerHTML = data.totalActividadesProgramaCentral;

    var programaSustantivo = document.getElementById("totalProgramaSustantivo");
    programaSustantivo.innerHTML = data.totalProgramasSustantivos;

    var programaNoAsignados = document.getElementById("totalActividadesProgramaNoAsignable");
    programaNoAsignados.innerHTML = data.totalActividadesProgramasNoAsignables;

  ***REMOVED***).fail(function (handleError) ***REMOVED***
    // Some function

  ***REMOVED***);



  //$.ajax(***REMOVED***
  //  url: "api/serviciosentidad/GetConsolidadoProgramasXCodEntidadAnio",
  //  type: "GET",
  //  data: param,
  //***REMOVED***).done(function (data) ***REMOVED***
  //  var nodes = [];
  //  var links = [];
  //  if (data.nodos != undefined && data.enlaces != undefined && data.nodos.length > 0 && data.enlaces.length > 0) ***REMOVED***

  //    for (var i = 0; i < data.nodos.length; i++) ***REMOVED***
  //      var nuevoNodo = ***REMOVED*** "id": data.nodos[i] ***REMOVED***;
  //      nodes.push(nuevoNodo);
  //***REMOVED***
  //    for (var i = 0; i < data.enlaces.length; i++) ***REMOVED***
  //      var nuevoLink = ***REMOVED*** "source": data.enlaces[i].emisor, "target": data.enlaces[i].receptor ***REMOVED***
  //      links.push(nuevoLink);
  //***REMOVED***
  //  ***REMOVED***
  //  new d3plus.Sankey()
  //    .select('#divSankey')
  //    .links(links)
  //    .nodes(nodes)
  //    .render();
  //***REMOVED***).fail(function (handleError) ***REMOVED***

  //***REMOVED***);

***REMOVED***

function GraficaSankey() ***REMOVED***
    var codigoEntidad = document.getElementById("codigoEntidadId").innerHTML;
    if (codigoEntidad != "") ***REMOVED***
        //var codigoEntidad = "23-34";
        var param = "codEntidad=" + codigoEntidad;
        $.ajax(***REMOVED***
            url: "api/serviciosentidad/GetGraficaSankey",
            type: "GET",
            data: ***REMOVED***
                codEntidad: codigoEntidad
        ***REMOVED***
    ***REMOVED***).done(function (result) ***REMOVED***
            if (result.status == true) ***REMOVED***
                var data = result.distribucionObjetivos;
                if (data.length > 0) ***REMOVED***
                    var datos = obtMatrizData(data);
                    $("#sankey_basic").html("");
                    //graphSankeyPloty(datos);
                    //$("#sankey_basic_old").html("");
                    graphSankey("sankey_basic", datos);

            ***REMOVED***

        ***REMOVED*** else ***REMOVED***
                bootbox.alert("Error: " + result.message, function () ***REMOVED***

            ***REMOVED***);
        ***REMOVED***


    ***REMOVED***).fail(function (handleError) ***REMOVED***
            //alert("error");
    ***REMOVED***);

***REMOVED***

***REMOVED***

function graphSankey(contenedor, datos) ***REMOVED***

    var height_aux = 0;
    var width_aux = 1100;
    var units = "millones";
    var cant_elementos = 5;
    if (datos != undefined && datos != null) ***REMOVED***
        if (datos.cant_nodos_fin.cant > 5) ***REMOVED***
            cant_elementos = datos.cant_nodos_fin.cant;
    ***REMOVED***

***REMOVED***

    let isMobile = window.matchMedia("only screen and (max-width: 765px)").matches;


    if ($(window).innerWidth() <= width_aux || isMobile) ***REMOVED***
        width_aux = 1100;
***REMOVED*** else ***REMOVED***
        width_aux = $(".container").innerWidth();
***REMOVED***


    var margin = ***REMOVED*** top: 10, right: 10, bottom: 10, left: 10 ***REMOVED***,
        width = width_aux - 20 - margin.left - margin.right,
        height = ((cant_elementos) * 30) - margin.top - margin.bottom;


    var format = function (d) ***REMOVED***
        return "";
        //return "₡ " + (d).formatMoney(0, '.', '.') + " " + units;
  ***REMOVED***
        color = d3.scale.category20();

    // append the svg canvas to the page
    var svg = d3.select("#" + contenedor).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Set the sankey diagram properties
    var sankey = d3.sankey()
        .nodeWidth(25)
        .nodePadding(20)
        .size([width, height]);

    var path = sankey.link();



    loadData(function (graph) ***REMOVED***

        // contents of the function passed to d3.json                   
        var nodeMap = ***REMOVED******REMOVED***;
        graph.nodes.forEach(function (x) ***REMOVED*** nodeMap[x.name] = x; ***REMOVED***);
        graph.links = graph.links.map(function (x) ***REMOVED***
            return ***REMOVED***
                source: nodeMap[x.source],
                target: nodeMap[x.target],
                value: x.value
        ***REMOVED***;
    ***REMOVED***);

        sankey
            .nodes(graph.nodes)
            .links(graph.links)
            .layout(632);

        // add in the links
        var link = svg.append("g").selectAll(".link")
            .data(graph.links)
            .enter().append("path")
            .attr("class", "link")
            .attr("d", path)
            .style("stroke-width", function (d) ***REMOVED***
                return Math.max(1, d.dy);
                //return 20;
        ***REMOVED***)
            .sort(function (a, b) ***REMOVED*** return b.dy - a.dy; ***REMOVED***);

        // add the link titles
        link.append("title")
            .text(function (d) ***REMOVED***
                var destino_aux = d.target.name;
                var origen_aux = d.source.name;
                var vec_destino = d.target.name.split("|");
                var vec_origen = d.source.name.split("|");
                if (vec_destino.length > 0) ***REMOVED***
                    destino_aux = vec_destino[1];
            ***REMOVED***
                if (vec_origen.length > 0) ***REMOVED***
                    origen_aux = vec_origen[1];
            ***REMOVED***

                return origen_aux + " → " +
                    destino_aux + "\n" + format(d.value);
        ***REMOVED***);

        // add in the nodes
        var node = svg.append("g").selectAll(".node")
            .data(graph.nodes)
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", function (d) ***REMOVED***
                return "translate(" + d.x + "," + d.y + ")";
        ***REMOVED***)
            .call(d3.behavior.drag()
                .origin(function (d) ***REMOVED*** return d; ***REMOVED***)
                .on("dragstart", function () ***REMOVED***
                    this.parentNode.appendChild(this);
            ***REMOVED***)
                .on("drag", dragmove));

        // add the rectangles for the nodes
        node.append("rect")
            .attr("height", function (d) ***REMOVED*** return d.dy; ***REMOVED***)
            .attr("width", sankey.nodeWidth())
            .style("fill", function (d) ***REMOVED***
                return d.color = color(d.name.replace(/ .*/, ""));
        ***REMOVED***)
            .style("stroke", function (d) ***REMOVED***
                return d3.rgb(d.color).darker(2);

        ***REMOVED***)
            .append("title")
            .text(function (d) ***REMOVED***
                var nombre = d.name;
                var vec_aux = nombre.split("|");
                if (vec_aux.length > 0) ***REMOVED***
                    nombre = vec_aux[1];
            ***REMOVED***
                return nombre + "\n" + format(d.value);
        ***REMOVED***);

        // add in the title for the nodes
        node.append("text")
            .attr("x", -6)
            .attr("y", function (d) ***REMOVED*** return d.dy / 2; ***REMOVED***)
            .attr("dy", ".2em")
            .style("font-size", "10px")
            .attr("text-anchor", "end")
            .attr("transform", null)
            .html(function (d) ***REMOVED***
                var nombre = d.name;
                var vec_aux = nombre.split("|");
                if (vec_aux.length > 0) ***REMOVED***
                    nombre = vec_aux[1];
            ***REMOVED***

                var long = nombre.length;
                var bandera = false;
                var long_aux = "";
                if (long > 50) ***REMOVED***
                    long_aux = 50;
                    bandera = true;
            ***REMOVED*** else ***REMOVED***
                    long_aux = long;
            ***REMOVED***


                var nombre_aux = nombre.substring(0, long_aux);
                if (bandera == true) ***REMOVED***
                    nombre_aux = nombre_aux + "...";
            ***REMOVED***

                return nombre_aux;

        ***REMOVED***)
            .filter(function (d) ***REMOVED*** return d.x < width / 2; ***REMOVED***)
            .attr("x", 6 + sankey.nodeWidth())
            .attr("text-anchor", "start");

        // the function for moving the nodes
        function dragmove(d) ***REMOVED***
            d3.select(this).attr("transform",
                "translate(" + (
                    d.x = Math.max(0, Math.min(width - d.dx, d3.event.x))
                ) + "," + (
                    d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
                ) + ")");
            sankey.relayout();
            link.attr("d", path);
    ***REMOVED***
  ***REMOVED*** datos);

***REMOVED***





function loadData(cb, datos) ***REMOVED***
    cb(datos)
***REMOVED***

function obtMatrizData(data) ***REMOVED***
    var cant_nodos_1 = 0;
    var cant_nodos_2 = 0;
    var cant_nodos_3 = 0;
    var cant_nodos_fin = 0;
    var obj_nodos = [];
    var obj_links = [];
    var indexLink = -1;
    $.each(data, function (key, value) ***REMOVED***
        //Eje
        indexLink += 1;
        cant_nodos_1 += 1;
        var test = false;
        var obj_aux = ***REMOVED*** posicion: indexLink, name: value.nombre ***REMOVED***;
        var nomEje = value.nombre;
        obj_nodos.push(obj_aux);
        $.each(value.detalles, function (key, value) ***REMOVED***
            //Estrategicos
            cant_nodos_2 += 1;

            var nomEstrategico = value.nombre;
            var valor_estrategico = (value.presupuesto / 1000000);

            test = obj_nodos.some(item => item.name === nomEstrategico);
            if (test == false) ***REMOVED***
                indexLink += 1;
                obj_aux = ***REMOVED*** posicion: indexLink, name: nomEstrategico ***REMOVED***;
                obj_nodos.push(obj_aux);
        ***REMOVED***

            var objIndex = obj_links.findIndex((obj => obj.target == nomEstrategico && obj.source == nomEje));
            if (objIndex > -1) ***REMOVED***
                obj_links[objIndex].value = obj_links[objIndex].value + valor_estrategico;
        ***REMOVED*** else ***REMOVED***
                var obj_links_aux = ***REMOVED*** source: nomEje, target: nomEstrategico, value: valor_estrategico ***REMOVED***
                obj_links.push(obj_links_aux);
        ***REMOVED***


            $.each(value.detalles, function (key, value) ***REMOVED***
                cant_nodos_3 += 1;
                //ObjEspecificos
                cant_nodos_fin += 1;
                var nomEspecifico = value.nombre;
                var valor_especifico = (value.presupuesto / 1000000);
                test = obj_nodos.some(item => item.name === nomEspecifico);
                if (test == false) ***REMOVED***
                    indexLink += 1;
                    obj_aux = ***REMOVED*** posicion: indexLink, name: nomEspecifico ***REMOVED***;
                    obj_nodos.push(obj_aux);
            ***REMOVED***

                var objIndex = obj_links.findIndex((obj => obj.target == nomEspecifico && obj.source == nomEstrategico));
                if (objIndex > -1) ***REMOVED***
                    obj_links[objIndex].value = obj_links[objIndex].value + valor_especifico;
            ***REMOVED*** else ***REMOVED***
                    obj_links_aux = ***REMOVED*** source: nomEstrategico, target: nomEspecifico, value: valor_especifico ***REMOVED***
                    obj_links.push(obj_links_aux);
            ***REMOVED***


        ***REMOVED***);


    ***REMOVED***);
***REMOVED***);

    cant_nodos_fin = cant_nodos_1;
    if (cant_nodos_2 > cant_nodos_1) ***REMOVED***
        cant_nodos_fin = cant_nodos_2;
***REMOVED***
    if (cant_nodos_3 > cant_nodos_2) ***REMOVED***
        cant_nodos_fin = cant_nodos_3;
***REMOVED***


    var datos_final =
    ***REMOVED***
        "links": obj_links,
        "nodes": obj_nodos,
        "cant_nodos_fin": ***REMOVED***
            cant: cant_nodos_fin
    ***REMOVED***
***REMOVED***;

    return datos_final;

***REMOVED***


Number.prototype.formatMoney = function (c, d, t) ***REMOVED***
  var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d***REMOVED***3***REMOVED***)(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
***REMOVED***;