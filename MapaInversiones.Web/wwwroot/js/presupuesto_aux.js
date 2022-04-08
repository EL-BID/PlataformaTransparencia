
inicializaDatos();

function inicializaDatos() ***REMOVED***
    // señala en todos los botones de las graficas el que debe ir por defecto
    if ($('#todosSectores').hasClass("bg-noactive")) ***REMOVED*** $('#todosSectores').removeClass("bg-noactive"); $('#todosSectores').addClass("bg-active"); $("#todosEntidades").removeClass("bg-active"); $("#todosEntidades").addClass("bg-noactive"); ***REMOVED***
    if ($('#topSectoresG').hasClass("bg-noactive")) ***REMOVED*** $('#topSectoresG').removeClass("bg-noactive"); $('#topSectoresG').addClass("bg-active"); $("#todosSectoresG").removeClass("bg-active"); $("#todosSectoresG").addClass("bg-noactive"); ***REMOVED***
    if ($('#topSectoresPSAA').hasClass("bg-noactive")) ***REMOVED*** $('#topSectoresPSAA').removeClass("bg-noactive"); $('#topSectoresPSAA').addClass("bg-active"); $("#todosSectoresPSAA").removeClass("bg-active"); $("#todosSectoresPSAA").addClass("bg-noactive"); ***REMOVED***
   // if ($('#ultimos5APT').hasClass("bg-noactive")) ***REMOVED*** $('#ultimos5APT').removeClass("bg-noactive"); $('#ultimos5APT').addClass("bg-active"); $("#annioPT").removeClass("bg-active"); $("#annioPT").addClass("bg-noactive"); ***REMOVED***
    if ($('#topGruposG').hasClass("bg-noactive")) ***REMOVED*** $('#topGruposG').removeClass("bg-noactive"); $('#topGruposG').addClass("bg-active"); $("#todosGruposG").removeClass("bg-active"); $("#todosGruposG").addClass("bg-noactive"); ***REMOVED***
    $('#annioPT').hide();
    //Treemap primera grafica Distribucion del presupuesto
    GetTreeMap(1, $("#annioPresupuesto option:selected").val());
    // Avance por sectores
    GetGastoSectores(0, $("#annioPresupuesto option:selected").val());
    //Presupuesto solicitado vs aprobado
    GetComboVersiones($("#annioPresupuesto option:selected").val());
    //Avance presupuestal en el tiempo
    GetDatosGastoPresupuestalTiempo(0, $("#annioPresupuesto option:selected").val());
    //Totales primera grafica
    GetDatosSectores($("#annioPresupuesto option:selected").val());
    //Grupo de gasto
    GetGrupoDeGasto(0, $("#annioPresupuesto option:selected").val());

    // devuelve los estilos de los combos a su valor por defecto
    $("#clasePrograma").prop("disabled", true);
    $("#clasePrograma").val("");
    $("#selectClasePrograma").prop("class", "selectDis");
    $("#entidad").prop("disabled", true);
    $("#entidad").val("");
    $("#selectEntidad").prop("class", "selectDis");
    $("#proyectoActividad").val("");
    $("#proyectoActividad").hide();
    $("#selectProyectoActividad").prop("class", "selectDis");
    //Treemap del final
    GetComboClasificacion($("#annioPresupuesto option:selected").val());
    //ENlaces piede pagina
    GetEntidadesPlanNacional()

    GetComboEntidadOG($("#annioPresupuesto option:selected").val());
***REMOVED***

function GetEntidadesPlanNacional() ***REMOVED***
    $.ajax(***REMOVED***
        url: "api/serviciosplan/GetEntidadesPlanNacional",
        type: "GET",
        data: null,

***REMOVED***).done(function (data) ***REMOVED***
        var entidadPlanNacional = document.getElementById("entidadesPlanNacional");
        var htmlList = '';
        for (var i = 0; i < data.length; i++) ***REMOVED***
            //htmlList = htmlList + "<li class='list-group-item'><a href=" + '/BusquedaResultados?SearchString=' + GenerarNombreEntidad(data[i].nombre) + ">" + "<span>" + data[i].nombre + "</span><i class='material-icons md-18'>chevron_right</i></a></li>";
            htmlList = htmlList + "<li class='list-group-item'><a href=" + '/PerfilEntidad?codEntidad=' + data[i].codEntidad + ">" + "<span>" + data[i].nombre + "</span><i class='material-icons md-18'>chevron_right</i></a></li>";
    ***REMOVED***
        if (data.length > 0)
            htmlList = htmlList + "<li class='list-group-item'><a href='/BusquedaResultados?Type=Entidad'>" + "<span>Ver todos</span><i class='material-icons md-18'>chevron_right</i></a></li>";
        entidadPlanNacional.innerHTML = htmlList;
***REMOVED***).fail(function (handleError) ***REMOVED***
        // Some function
        console.log(handleError);
***REMOVED***);
***REMOVED***

function GenerarNombreEntidad(nombreEntidad) ***REMOVED***
    var nombresEntidad = nombreEntidad.split(' ');
    var rta = "";
    for (var j = 0; j < nombresEntidad.length; j++) ***REMOVED***
        if (j == 0) rta = nombresEntidad[j];
        else rta = rta + "+" + nombresEntidad[j];
***REMOVED***
    return rta;
***REMOVED***

function GetTreeMap(consulta, annio) ***REMOVED***
    var param = "consulta=" + consulta + "&annio=" + annio;
    //var params = ***REMOVED***
    //  consulta: counsulta
    //***REMOVED***;
    var data = $("#Distribucion").data("c" + consulta + "_" + annio);
    $("#Distribucion").attr("consulta", consulta);
    if (data) ***REMOVED***
        //var datos = data.infoGrafica
        loadRecursosPorObjeto(data, "divGraphTreePresupuesto", "presupuesto");
***REMOVED*** else ***REMOVED***
        $.ajax(***REMOVED***
            url: "api/serviciospresupuesto/TreeMapSectores/",
            type: "GET",
            data: param,

    ***REMOVED***).done(function (data) ***REMOVED***

            loadRecursosPorObjeto(data.infoGrafica, "divGraphTreePresupuesto", "presupuesto");
            //console.log("GetTreeMap");
            //console.log(data);JSON.stringify(my_object)

            $("#Distribucion").attr("data-c" + consulta + "_" + annio, JSON.stringify(data.infoGrafica));
            
            //alert($("#divGraphTreePresupuesto").attr("c" +consulta + "" + annio));
    ***REMOVED***).fail(function (handleError) ***REMOVED***
            // Some function
            console.log(handleError);
    ***REMOVED***);
        
***REMOVED***
***REMOVED***

function GetDatosSectores(annio) ***REMOVED***
var param = "annio=" + annio;
//var params = ***REMOVED***
//  consulta: counsulta
//***REMOVED***;
$.ajax(***REMOVED***
    url: "api/serviciospresupuesto/DatosSectores/",
    type: "GET",
    data: param,

***REMOVED***).done(function (data) ***REMOVED***

   // $('#totalPresupuesto').html(data.infoGrafica);
    $("#totalPresupuesto").html("Total Presupuesto " + $("#annioPresupuesto option:selected").val());
    $("#totalPresupuestoValue").html("₲ " + ((data.infoGrafica[0]["totalGasto"] * 1) / 1000000).formatMoney(0, ',', '.').toString() + " Millones");
    $("#totalPresupuestoProgramas").html("PRESUPUESTO TOTAL ₲ " + ((data.infoGrafica[0]["totalGasto"] * 1) / 1000000).formatMoney(0, ',', '.').toString() + " Millones");
    $("#annioPresupuestoText").html("" + $("#annioPresupuesto option:selected").val());
    //console.log("Objetivos");
    //console.log(data);


***REMOVED***).fail(function (handleError) ***REMOVED***
    // Some function
    console.log(handleError);
***REMOVED***);
***REMOVED***

function GetGastoSectores(consulta, annio) ***REMOVED***
    var param = "consulta=" + consulta + "&annio=" + annio;
    //var params = ***REMOVED***
    //  consulta: counsulta
    //***REMOVED***;
    $.ajax(***REMOVED***
        url: "api/serviciospresupuesto/BarChartSectores/",
        type: "GET",
        data: param,

***REMOVED***).done(function (data) ***REMOVED***

        //$('#totalPresupuesto').html(data.infoGrafica);

        loadBarChartSectores(data.infoGrafica,"divGraphBarChartGastoSectores");
        //console.log("GetGastoSectores");
        //console.log(data);


***REMOVED***).fail(function (handleError) ***REMOVED***
        // Some function
        console.log(handleError);
***REMOVED***);
***REMOVED***

function GetDatosGastoPresupuestalSolicitadoVAprobado(consulta, annio, version1, version2) ***REMOVED***
    var param = "consulta=" + consulta + "&annio=" + annio + "&version1=" + version1 + "&version2=" + version2;
    //var params = ***REMOVED***
    //  consulta: counsulta
    //***REMOVED***;
    $.ajax(***REMOVED***
        url: "api/serviciospresupuesto/LinePlotPresupuestoSolicitadoAprobado/",
        type: "GET",
        data: param,

***REMOVED***).done(function (data) ***REMOVED***

        //$('#totalPresupuesto').html(data.infoGrafica);
        loadAreaSolicitadoVAprobado(data.infoGrafica, "divGraphBarChartPresupuestoSolicitadoVAprobado");

        //console.log("GetDatosGastoPresupuestalSolicitadoVAprobado");
        //console.log(data);


***REMOVED***).fail(function (handleError) ***REMOVED***
        // Some function
        console.log(handleError);
***REMOVED***);
***REMOVED***

function GetDatosGastoPresupuestalTiempo(consulta,annio) ***REMOVED***
    var param = "consulta=" + consulta + "&annio=" + annio;
    //var params = ***REMOVED***
    //  consulta: counsulta
    //***REMOVED***;
    $.ajax(***REMOVED***
        url: "api/serviciospresupuesto/LinePlotGastoPresupuestalTiempo/",
        type: "GET",
        data: param,

***REMOVED***).done(function (data) ***REMOVED***

        //$('#totalPresupuesto').html(data.infoGrafica);
        loadLinePlotGastoTiempo(data.infoGrafica, "divGraphBarLinePlotPresupuestoTiempo");

        //console.log("Objetivos");
        //console.log(data);


***REMOVED***).fail(function (handleError) ***REMOVED***
        // Some function
        console.log(handleError);
***REMOVED***);
***REMOVED***


function GetGrupoDeGasto(consulta, annio) ***REMOVED***
    var param = "consulta=" + consulta + "&annio=" + annio;
    //var params = ***REMOVED***
    //  consulta: counsulta
    //***REMOVED***;
    $.ajax(***REMOVED***
        url: "api/serviciospresupuesto/LinePlotGrupoDeGasto/",
        type: "GET",
        data: param,

***REMOVED***).done(function (data) ***REMOVED***

        //$('#totalPresupuesto').html(data.infoGrafica);

        loadBarChartGrupoDeGasto(data.infoGrafica, "divGraphGrupoGasto");
        //console.log("GetGrupoDeGasto");
        //console.log(data);


***REMOVED***).fail(function (handleError) ***REMOVED***
        // Some function
        console.log(handleError);
***REMOVED***);
***REMOVED***


//function GetDatosGastoPresupuestalTiempo(annio) ***REMOVED***
//    var param = "annio=" + annio;
//    //var params = ***REMOVED***
//    //  consulta: counsulta
//    //***REMOVED***;
//    $.ajax(***REMOVED***
//        url: "api/serviciospresupuesto/ComboNiveles/",
//        type: "GET",
//        data: param,

//***REMOVED***).done(function (data) ***REMOVED***

//        //$('#totalPresupuesto').html(data.infoGrafica);
//        loadLinePlotGastoTiempo(data.infoGrafica, "divGraphBarLinePlotPresupuestoTiempo");

//        console.log("Objetivos");
//        console.log(data);


//***REMOVED***).fail(function (handleError) ***REMOVED***
//        // Some function

//***REMOVED***);
//***REMOVED***

function GetComboVersiones(annio) ***REMOVED***
    var param = "annio=" + annio;
    //var params = ***REMOVED***
    //  consulta: counsulta
    //***REMOVED***;
    //if ($('#clasificacion').attr('data-' + annio, items_result)) ***REMOVED***
    //***REMOVED***
    //    else ***REMOVED*** 
    $.ajax(***REMOVED***
        url: "api/serviciospresupuesto/ComboVersiones/",
        type: "GET",
        data: param,

***REMOVED***).done(function (data) ***REMOVED***


        var items_result = data.infoGrafica;
        var select = "";
        for (var i = 0; i < items_result.length; i++) ***REMOVED***
            select = select + '<option value="' + items_result[i].version.toString() + '">' + items_result[i].nombreVersion.toString() + '</option>';
    ***REMOVED***
        $('#version1').html(select).fadeIn();
        $('#version2').html(select).fadeIn();

        if (items_result.length > 1) ***REMOVED***
            $("version2 :nth-child(2)").prop('selected', true);
    ***REMOVED***

        $('#version1').attr('consulta', 0);
        GetDatosGastoPresupuestalSolicitadoVAprobado(0, $("#annioPresupuesto option:selected").val(), $("#version1 option:selected").val(), $("#version2 option:selected").val());


***REMOVED***).fail(function (handleError) ***REMOVED***
        // Some function
        alert("Error GetComboVersiones");
        console.log(handleError);
***REMOVED***);
    /****REMOVED****/
***REMOVED***


/***********************GRAFICA DE DISTRIBUCION EN PROGRAMAS*****************************************/
function GetComboClasificacion(annio) ***REMOVED***
    var param = "annio=" + annio;
    $("#clasePrograma").prop("disabled", true);
    $("#clasePrograma").val("");
    $("#selectClasePrograma").prop("class", "selectDis");
    $("#entidad").prop("disabled", true);
    $("#entidad").val("");
    $("#selectEntidad").prop("class", "selectDis");
    $("#proyectoActividad").val("");
    $("#selectProyectoActividad").prop("class", "selectDis");
    $("#btnVolver").hide();
    $("#clasificacion").prop("disabled", true);
   // $("#selectProyectoActividad").hide();
    
    var data = $('#clasificacion').data(annio);
    if (data) ***REMOVED***
        var select = "";
        select = select + '<option value="">Todas las Clasificaciones</option>';
        for (var i = 0; i < data.length; i++) ***REMOVED***
            select = select + '<option value="' + data[i].clasificacion.toString() + '">' + data[i].clasificacion.toString() + '</option>';
    ***REMOVED***
        $('#clasificacion').html(select).fadeIn();
        $('#DistribucionProgramas').attr('nivel', 1);
        treeMapCombos(data, "treeMapCombos", "clasificacion", "totalClasificacion");
        $("#clasificacion").prop("disabled", false);
***REMOVED***
        else ***REMOVED*** 
        $.ajax(***REMOVED***
            url: "api/serviciospresupuesto/ComboClasificacion/",
            type: "GET",
            data: param,

    ***REMOVED***).done(function (data) ***REMOVED***

            //$('#totalPresupuesto').html(data.infoGrafica);
            //loadLinePlotGastoTiempo(data.infoGrafica, "divGraphBarLinePlotPresupuestoTiempo");
            var items_result = data.infoGrafica;
            var select = "";
            select = select + '<option value="">Todas las Clasificaciones</option>';
            for (var i = 0; i < items_result.length; i++) ***REMOVED***
                select = select + '<option value="' + items_result[i].clasificacion.toString() + '">' + items_result[i].clasificacion.toString() + '</option>';
        ***REMOVED***
            $('#clasificacion').html(select).fadeIn();
            $('#clasificacion').attr("data-" + $.trim(annio) , JSON.stringify(items_result));
            $('#DistribucionProgramas').attr('nivel', 1);
            
            //console.log("Objetivos");
           /* console.log(items_result);*/
            treeMapCombos(items_result, "treeMapCombos", "clasificacion", "totalClasificacion");
            $("#clasificacion").prop("disabled", false);
    ***REMOVED***).fail(function (handleError) ***REMOVED***
            // Some function
            alert("Error GetComboClasificacion");
            console.log(handleError);
    ***REMOVED***);
***REMOVED***
***REMOVED***

function GetComboEntidad(annio, clasificacion) ***REMOVED***
    var param = "annio=" + annio + "&clasificacion=" + clasificacion;
    $("#btnVolver").show();
    if (clasificacion == "") ***REMOVED***

        $("#entidad").prop("disabled", true);
        $("#entidad").val("");
        $("#selectEntidad").prop("class", "selectDis");
        //$("#dropdown").prop("disabled", true);
        //$("#mySelect").val("");
        //$("#dropdown").prop("disabled", true);
        //$("#mySelect").val("");
***REMOVED***
    else ***REMOVED***

        //var params = ***REMOVED***
        //  consulta: counsulta
        //***REMOVED***;
        //if ($('#clasificacion').attr('data-' + annio, items_result)) ***REMOVED***
        //***REMOVED***
        //    else ***REMOVED*** 
        $.ajax(***REMOVED***
            url: "api/serviciospresupuesto/ComboEntidad/",
            type: "GET",
            data: param,

    ***REMOVED***).done(function (data) ***REMOVED***

            //$('#totalPresupuesto').html(data.infoGrafica);
            //loadLinePlotGastoTiempo(data.infoGrafica, "divGraphBarLinePlotPresupuestoTiempo");
            var items_result = data.infoGrafica;
            var select = "";
            select = select + '<option value="">Todas las Entidades</option>';
            for (var i = 0; i < items_result.length; i++) ***REMOVED***
                select = select + '<option value="' + items_result[i].entidad.toString() + '">' + items_result[i].entidad.toString() + '</option>';
        ***REMOVED***

            $('#entidad').html(select).fadeIn();
            $('#entidad').attr('data-' + $.trim(annio) + '-' + $.trim(clasificacion).replace(/ /g, '_'), JSON.stringify(items_result));
            //console.log("Objetivos");
            /*           console.log(items_result);*/
            $("#entidad").prop("disabled", false);
            $("#selectEntidad").prop("class", "selectBlue");
            $('#DistribucionProgramas').attr('nivel', 2);
            //$("#clasePrograma").val("");
            treeMapCombos(items_result, "treeMapCombos", "entidad", "totalEntidad");
    ***REMOVED***).fail(function (handleError) ***REMOVED***
            // Some function
            alert("Error GetComboEntidad");
            console.log(handleError);
    ***REMOVED***);
        /****REMOVED****/

***REMOVED***
***REMOVED***


function GetComboClasePrograma(annio, clasificacion, entidad) ***REMOVED***
    var param = "annio=" + annio + "&clasificacion=" + clasificacion + "&clasePrograma=" + clasePrograma + "&entidad=" + entidad;
    
    if (clasePrograma == "") ***REMOVED***

        $("#clasePrograma").prop("disabled", true);
        $("#clasePrograma").val("");
        $("#selectClasePrograma").prop("class", "selectDis");

***REMOVED***
    else ***REMOVED***

        //var params = ***REMOVED***
        //  consulta: counsulta
        //***REMOVED***;
        //if ($('#clasificacion').attr('data-' + annio, items_result)) ***REMOVED***
        //***REMOVED***
        //    else ***REMOVED*** 
        $.ajax(***REMOVED***
            url: "api/serviciospresupuesto/ComboClasePrograma/",
            type: "GET",
            data: param,

    ***REMOVED***).done(function (data) ***REMOVED***

            //$('#totalPresupuesto').html(data.infoGrafica);
            //loadLinePlotGastoTiempo(data.infoGrafica, "divGraphBarLinePlotPresupuestoTiempo");
            var items_result = data.infoGrafica;
            var select = "";
            select = select + '<option value="">Todas las Clases de Programa</option>';
            for (var i = 0; i < items_result.length; i++) ***REMOVED***
                select = select + '<option value="' + items_result[i].clasePrograma.toString() + '">' + items_result[i].clasePrograma.toString() + '</option>';
        ***REMOVED***
            $('#clasePrograma').html(select).fadeIn();
            $('#clasePrograma').attr('data-' + annio + '-' + $.trim(clasificacion).replace(/ /g, '_') + '-' + $.trim(entidad).replace(/ /g, '_'), JSON.stringify(items_result));
            //console.log("Objetivos");
            //console.log(items_result);
            $("#clasePrograma").prop("disabled", false);
            $("#selectClasePrograma").prop("class", "selectBlue");
            $('#DistribucionProgramas').attr('nivel', 3);
            //$("#clasePrograma").val("");
            treeMapCombos(items_result, "treeMapCombos", "clasePrograma", "totalClasePrograma");
    ***REMOVED***).fail(function (handleError) ***REMOVED***
            // Some function
            alert("Error GetComboClasePrograma");
            console.log(handleError);
    ***REMOVED***);
        /****REMOVED****/

***REMOVED***
***REMOVED***

function GetComboProyectoActividad(annio, clasificacion, entidad, clasePrograma) ***REMOVED***
    var param = "annio=" + annio + "&clasificacion=" + clasificacion + "&clasePrograma=" + clasePrograma + "&entidad=" + entidad;
    if (entidad == "") ***REMOVED***

        //$("#proyectoActividad").prop("disabled", true);
        //$("#proyectoActividad").val("");
        $("#selectProyectoActividad").prop("class", "selectDis");
        //$("#dropdown").prop("disabled", true);
        //$("#mySelect").val("");
        //$("#dropdown").prop("disabled", true);
        //$("#mySelect").val("");
***REMOVED***
    else ***REMOVED***

        //var params = ***REMOVED***
        //  consulta: counsulta
        //***REMOVED***;
        //if ($('#clasificacion').attr('data-' + annio, items_result)) ***REMOVED***
        //***REMOVED***
        //    else ***REMOVED*** 
        $.ajax(***REMOVED***
            url: "api/serviciospresupuesto/ComboProyectoActividad/",
            type: "GET",
            data: param,

    ***REMOVED***).done(function (data) ***REMOVED***

 
            var items_result = data.infoGrafica;
            //var select = "";
            //select = select + '<option value="">Todos los Proyecto Actividad</option>';
            //for (var i = 0; i < items_result.length; i++) ***REMOVED***
            //    select = select + '<option value="' + items_result[i].proyectoActividad.toString() + '">' + items_result[i].proyectoActividad.toString() + '</option>';
            //***REMOVED***
            //$('#proyectoActividad').html(select).fadeIn();
            //$('#proyectoActividad').hide();

            $('#proyectoActividad').attr('data-' + annio + '-' + $.trim(clasificacion).replace(/ /g, '_') + '-' + $.trim(clasePrograma).replace(/ /g, '_') + '-' + $.trim(entidad).replace(/ /g, '_'), JSON.stringify(items_result));


            //$("#proyectoActividad").prop("disabled", false);
            $("#selectProyectoActividad").prop("class", "selectBlue");
            $('#DistribucionProgramas').attr('nivel', 4);
            treeMapCombos(items_result, "treeMapCombos", "proyectoActividad", "totalProyectoActividad");
            //$("#clasePrograma").val("");

    ***REMOVED***).fail(function (handleError) ***REMOVED***
            // Some function
            alert("Error selectProyectoActividad");
            console.log(handleError);
    ***REMOVED***);
        /****REMOVED****/

***REMOVED***
***REMOVED***

function elegirChange(nivel, consulta) ***REMOVED***
    //alert(nivel + "  " + consulta);
    if (nivel == 1) ***REMOVED***
        
        GetComboClasificacion($("#annioPresupuesto option:selected").val());
***REMOVED***
    if (nivel == 2) ***REMOVED***
        $("#clasificacion").val(consulta);
        changeClasificacion(consulta)
***REMOVED***
    if (nivel == 3) ***REMOVED***
        $("#entidad").val(consulta);
        changeEntidad(consulta)  
***REMOVED***
    if (nivel == 4) ***REMOVED***
        $("#clasePrograma").val(consulta);
        changeClasePrograma(consulta)
***REMOVED***
***REMOVED***

function changeClasificacion(consulta) ***REMOVED***

    $("#clasePrograma").prop("disabled", true);
    $("#clasePrograma").val("");
    $("#selectClasePrograma").prop("class", "selectDis");
    $("#entidad").prop("disabled", true);
    $("#entidad").val("");
    $("#selectEntidad").prop("class", "selectDis");
    $("#proyectoActividad").val("");
    $("#selectProyectoActividad").prop("class", "selectDis");
    
    GetComboEntidad($("#annioPresupuesto option:selected").val(), consulta); //consulta es el valor actual del combo
***REMOVED***

function changeEntidad(consulta) ***REMOVED***
    $("#clasePrograma").prop("disabled", true);
    $("#clasePrograma").val("");
/*    $("#clasePrograma").prop("class", "selectDis");*/
    $("#proyectoActividad").prop("disabled", true);
    $("#proyectoActividad").val("");
    $("#selectProyectoActividad").prop("class", "selectDis");
    GetComboClasePrograma($("#annioPresupuesto option:selected").val(), $("#clasificacion option:selected").val(), consulta);   
***REMOVED***

function changeClasePrograma(consulta) ***REMOVED***

   
    /*$("#proyectoActividad").val("");*/
    $("#selectProyectoActividad").prop("class", "selectDis");
    GetComboProyectoActividad($("#annioPresupuesto option:selected").val(), $("#clasificacion option:selected").val(), $("#entidad option:selected").val(), consulta);
***REMOVED***



function treeMapCombos(objData, divContenedor, label, value) ***REMOVED***
    $("#" + divContenedor).empty();
    if (objData != undefined && objData != null) ***REMOVED***
        new d3plus.Treemap()
            .select("#" + divContenedor)
            .data(objData)
            .groupBy([label, "label", "label_inf", "label_nivel4"])
            .on("click", function (d) ***REMOVED***
               // alert(d[label] + " has been clicked!");
                elegirChange($('#DistribucionProgramas').attr('nivel')*1 + 1, d[label])
        ***REMOVED***)
            .shapeConfig(***REMOVED***

                labelConfig: ***REMOVED***
                    //fontFamily: "serif",
                    fontMax: 100,
                    align: "center",
                    size: 14,
                    transform: "capitalize"
            ***REMOVED***
        ***REMOVED***)

            .config(***REMOVED***
                tooltipConfig: ***REMOVED***
                    title: function (d) ***REMOVED***
                        return d[label];
                  ***REMOVED***
                    tbody: [
                        ["Total",function (d) ***REMOVED*** return "₲ " + ((d[value] * 1) / 1000000).formatMoney(0, ',', '.').toString() + " Millones" ***REMOVED***],
                       // ["Versión Presupuesto", function (d) ***REMOVED*** return d["version"] ***REMOVED***]
                    ]
              ***REMOVED***
                yConfig: ***REMOVED***
                    title: "",
            ***REMOVED***
        ***REMOVED***)
            .sum(value)
            //.depth(0)
            .legend(false)
            .color(label)
            .colorScale(["#2D506A", "#236B81", "#265C87", "#468ABF"])
            //.width(600)
            //.height(400)
            .render();
***REMOVED***
***REMOVED***

/***********************END GRAFICA DE DISTRIBUCION EN PROGRAMAS*****************************************/


function loadRecursosPorObjeto(objData, divContenedor, tipo_desglose) ***REMOVED***
    $("#" + divContenedor).empty();
    $("#btnVolverDP").hide();
    
    if (objData != undefined && objData != null) ***REMOVED***
        new d3plus.Treemap()
            .select("#" + divContenedor)
            .data(objData)
            .groupBy(["labelGroup"])
            .on("click", function (d) ***REMOVED***
                var data = $("#Distribucion").data("c" + $("#Distribucion").attr("consulta") + "_" + $("#annioPresupuesto option:selected").val());
                var searchField = "labelGroup";
                var searchVal = d["labelGroup"];
                var results = [];
                for (var i = 0; i < data.length; i++) ***REMOVED***
                    if (data[i][searchField] == searchVal) ***REMOVED***
                        results.push(data[i]);
                ***REMOVED***
            ***REMOVED***
                loadRecursosPorObjeto2(results, divContenedor,"")
        ***REMOVED***)
            .shapeConfig(***REMOVED***

                labelConfig: ***REMOVED***
                    //fontFamily: "serif",
                    fontMax: 100,
                    align: "center",
                    size: 14,
                    transform: "capitalize"
            ***REMOVED***
        ***REMOVED***)

            .config(***REMOVED***
                tooltipConfig: ***REMOVED***
                    title: function (d) ***REMOVED***
                        return d["labelGroup"];
                  ***REMOVED***
                    tbody: [
                        [function (d) ***REMOVED*** return "₲ " + d["rawValue"].formatMoney(0, ',', '.').toString() + " Millones" ***REMOVED***],
                        ["<i>Click para expandir</i>"]
                    ]
              ***REMOVED***
                yConfig: ***REMOVED***
                    title:  "",
            ***REMOVED***
        ***REMOVED***)
            .sum("rawValue")
            //.depth(0)
            .legend(false)
            .color("labelGroup")
            .colorScale(["#2D506A", "#236B81", "#265C87", "#468ABF"])
            //.width(600)
            //.height(400)
            .render();
***REMOVED***
***REMOVED***

function loadRecursosPorObjeto2(objData, divContenedor, tipo_desglose) ***REMOVED***
    $("#" + divContenedor).empty();
    $("#btnVolverDP").show();
    if (objData != undefined && objData != null) ***REMOVED***
        new d3plus.Treemap()
            .select("#" + divContenedor)
            .data(objData)
            .groupBy(["label"]) //groupBy(["labelGroup", "label", "label_inf", "label_nivel4"])
            
            .shapeConfig(***REMOVED***

                labelConfig: ***REMOVED***
                   // fontFamily: "serif",
                    fontMax: 100,
                    align: "center",
                    size: 14,
                    transform: "capitalize"
            ***REMOVED***
        ***REMOVED***)

            .config(***REMOVED***
                tooltipConfig: ***REMOVED***
                    title: function (d) ***REMOVED***
                        return d["label"];
                  ***REMOVED***
                    tbody: [
                        ["", function (d) ***REMOVED*** return d["labelGroup"] ***REMOVED***],
                        ['', function (d) ***REMOVED*** return "₲ " + d["rawValue"].formatMoney(0, ',', '.').toString() + " Millones" ***REMOVED***]
                       
                    ]
              ***REMOVED***
                yConfig: ***REMOVED***
                    title: "",
            ***REMOVED***
        ***REMOVED***)
            .sum("rawValue")
            //.depth(0)
            .legend(false)
            //.color("labelGroup")
            //.colorScale(["#2D506A", "#236B81", "#265C87", "#468ABF"])
            //.width(600)
            //.height(419)
            
            .render();
***REMOVED***
***REMOVED***

function loadBarChartSectores(objData, divContenedor) ***REMOVED***
    $("#" + divContenedor).empty();
    if (objData != undefined && objData != null) ***REMOVED***
        new d3plus.BarChart()
            .select("#" + divContenedor)
            //.data(data)
            .config(***REMOVED***
                data: objData,
                groupBy: "labelGroup",
                x: "label",
                y: "rawValue",
                shapeConfig: ***REMOVED***
                    //label: false,
                    labelConfig: ***REMOVED***
                        fontMin: 4,
                        fontMax: 8
                ***REMOVED***
                    
              ***REMOVED***
                tooltipConfig: ***REMOVED***
                    title: function (d) ***REMOVED***
                        return " ";//d["labelGroup"];
                  ***REMOVED***
                    tbody: [
                        [function (d) ***REMOVED*** return "₲ " + d["rawValue"].formatMoney(0, ',', '.').toString() + " Millones" ***REMOVED***]
                        //["₲", function (d) ***REMOVED*** return d["rawValue"].formatMoney(0, ',', '.').toString() ***REMOVED***]
                        //["Total", function (d) ***REMOVED*** return d["Number of Food Stores"] ***REMOVED***],
                        //["Year", function (d) ***REMOVED*** return d.year ***REMOVED***]
                    ]
              ***REMOVED***
                yConfig: ***REMOVED***
                    title: " ",
                    //ticks: [],
                    scale: "pow",
                    tickFormat: function (d) ***REMOVED***
                        return (d/1000000) + " B";
                ***REMOVED***
              ***REMOVED***
                xConfig: ***REMOVED***
                    fontsize: "2px",
                    size:"2px"
              ***REMOVED***
                legend: false
        ***REMOVED***)
            .barPadding(0)
            .groupPadding(12)
           // .stacked(true)
            .colorScale(["#2D506A", "#236B81", "#265C87", "#468ABF"])
            //.height(400)
            .render();
***REMOVED***
***REMOVED***

function loadAreaSolicitadoVAprobado(objData, divContenedor) ***REMOVED***
    $("#" + divContenedor).empty();
    if (objData != undefined && objData != null) ***REMOVED***
        new d3plus.BarChart()
            .select("#" + divContenedor)
            .config(***REMOVED***
                data: objData,
                groupBy: "labelGroup",
                x: "label",
                y: "rawValue",
                shapeConfig: ***REMOVED***
                    //label: false,
                    labelConfig: ***REMOVED***
                        fontMin: 4,
                        fontMax: 8
                ***REMOVED***

              ***REMOVED***
                tooltipConfig: ***REMOVED***
                    title: function (d) ***REMOVED***
                        return d["labelGroup"];
                  ***REMOVED***
                    tbody: [
                        [function (d) ***REMOVED*** return "₲ " + d["rawValue"].formatMoney(0, ',', '.').toString() + " Millones" ***REMOVED***]
                    ]
              ***REMOVED***
                //lineMarkers: true,
                //lineMarkerConfig: ***REMOVED***
                //    r: 3
                //***REMOVED***,
                yConfig: ***REMOVED***
                    maxSize: "100px",
                    title: [],
                    scale: "pow",
                    tickFormat: function (d) ***REMOVED***
                        return (d / 1000000) + " B";
                ***REMOVED***
              ***REMOVED***
                xConfig: ***REMOVED***
                    fontsize: "2px",
                    size: "2px"
              ***REMOVED***
                 legend: false
        ***REMOVED***)
            .barPadding(0)
            .groupPadding(12)
            //.colorScale(["#2D506A", "#236B81", "#265C87", "#468ABF"])
            //.height(400)
            .render();
***REMOVED***
***REMOVED***

function loadLinePlotGastoTiempo(objData, divContenedor) ***REMOVED***
    $("#" + divContenedor).empty();
    if (objData != undefined && objData != null) ***REMOVED***
        new d3plus.LinePlot()
            .select("#" + divContenedor)
            .shapeConfig(***REMOVED***
                Line: ***REMOVED***
                    strokeWidth: 3,
                    curve: "catmullRom"
            ***REMOVED***
        ***REMOVED***)
            .config(***REMOVED***

                data: objData,
                groupBy: "labelGroup",
                x: "label",
                y: "rawValue",
                tooltipConfig: ***REMOVED***
                    title: function (d) ***REMOVED***
                        return d["labelGroup"];
                  ***REMOVED***
                    tbody: [
                        ["% del Presupuesto",function (d) ***REMOVED*** return d["rawValue"].formatMoney(2, ',', '.').toString() + " %" ***REMOVED***]
                        //["₲", function (d) ***REMOVED*** return d["rawValue"].formatMoney(0, ',', '.').toString() ***REMOVED***]
                    ]
              ***REMOVED***
                lineMarkers: true,
                lineMarkerConfig: ***REMOVED***
                    r: 3
              ***REMOVED***
                yConfig: ***REMOVED***
                    title: "Distribución Interanual del Avance por Sectores.",
                    //scale: "sqrt"
                    tickFormat: function (d) ***REMOVED***
                        return d + "%";
                ***REMOVED***
              ***REMOVED***
               // lineLabels: true
                legend: false
        ***REMOVED***)
            //.height(400)
            .render();
***REMOVED***
***REMOVED***

function loadBarChartGrupoDeGasto(objData, divContenedor) ***REMOVED***
    $("#" + divContenedor).empty();
    if (objData != undefined && objData != null) ***REMOVED***
        new d3plus.BarChart()
            .select("#" + divContenedor)
            //.data(data)
            .config(***REMOVED***
                data: objData,
                groupBy: "annio",
                x: "labelGroup",
                y: "totalPresupuesto",
                /*discrete:"x",*/
                shapeConfig: ***REMOVED***
                   // label: false,
              ***REMOVED***
                tooltipConfig: ***REMOVED***
                    title: function (d) ***REMOVED***
                        return d["labelGroup"] + " "+d["annio"];
                  ***REMOVED***
                    tbody: [
                      //  ["Año",function (d) ***REMOVED*** return "" + d["label"] + "" ***REMOVED***],
                       // [function (d) ***REMOVED*** return "Año " + d["annio"] + "" ***REMOVED***],
                        [function (d) ***REMOVED*** return "₲ " + d["totalPresupuesto"].formatMoney(0, ',', '.').toString() + " Millones" ***REMOVED***],
                        [function (d) ***REMOVED*** return "Variación contra el año anterior " + d["rawValue"].formatMoney(2, ',', '.').toString() + " %" ***REMOVED***]
                        
                        //["Total", function (d) ***REMOVED*** return d["Number of Food Stores"] ***REMOVED***],
                        //["Year", function (d) ***REMOVED*** return d.year ***REMOVED***]
                    ]
              ***REMOVED***
                yConfig: ***REMOVED***
                    title: [],
                    //ticks: [],
                    scale: "pow",
                    tickFormat: function (d) ***REMOVED***
                        return (d / 1000000) + " B";
                ***REMOVED***
              ***REMOVED***
                //xConfig: ***REMOVED***
                //    fontsize: "2px",
                //    size: "2px"
                //***REMOVED***,
                 legend: false
        ***REMOVED***)
            .barPadding(0)
            .groupPadding(12)
            // .stacked(true)
            .colorScale(["#2D506A", "#236B81", "#265C87", "#468ABF"])
            //.height(400)
            .render();
***REMOVED***
***REMOVED***



/***********************GRAFICA DE DISTRIBUCION objeto de gasto*****************************************/

function treeMapCombosOG(objData, divContenedor, label, value) ***REMOVED***
    $("#" + divContenedor).empty();
    if (objData != undefined && objData != null) ***REMOVED***
        new d3plus.Treemap()
            .select("#" + divContenedor)
            .data(objData)
            .groupBy([label, "label", "label_inf", "label_nivel4"])
            .on("click", function (d) ***REMOVED***
                // alert(d[label] + " has been clicked!");
                elegirChangeOG($('#DistribucionObjetoGasto').attr('nivel') * 1 + 1, d[label])
        ***REMOVED***)
            .shapeConfig(***REMOVED***

                labelConfig: ***REMOVED***
                   // fontFamily: "serif",
                    fontMax: 100,
                    align: "center",
                    size: 14,
                    transform: "capitalize"
            ***REMOVED***
        ***REMOVED***)

            .config(***REMOVED***
                tooltipConfig: ***REMOVED***
                    title: function (d) ***REMOVED***
                        return d[label];
                  ***REMOVED***
                    tbody: [
                        ["Total", function (d) ***REMOVED*** return "₲ " + ((d[value] * 1) / 1000000).formatMoney(0, ',', '.').toString() + " Millones" ***REMOVED***],
                        // ["Versión Presupuesto", function (d) ***REMOVED*** return d["version"] ***REMOVED***]
                    ]
              ***REMOVED***
                yConfig: ***REMOVED***
                    title: "",
            ***REMOVED***
        ***REMOVED***)
            .sum(value)
            //.depth(0)
            .legend(false)
            .color(label)
            //.colorScale(["#2D506A", "#236B81", "#265C87", "#468ABF"])
            //.width(600)
            //.height(400)
            .render();
***REMOVED***
***REMOVED***

function GetComboEntidadOG(annio) ***REMOVED***
    var param = "annio=" + annio;

    $("#proyectoActividadOG").val("");
    $("#selectProyectoActividadOG").prop("class", "selectDis");
    $("#btnVolverOG").hide();
    $("#objetoGasto").prop("disabled", true);
    $("#objetoGasto").val("");
    $("#selectObjetoGasto").prop("class", "selectDis");
    $("#entidadOG").prop("disabled", true);
   

    var data = $('#entidadOG').data(annio);
    $("#btnVolverOG").hide();
    var select = "";
    var data = $('#entidadOG').data('OG' + annio)
    if (data) ***REMOVED***
           
            select = select + '<option value="">Todas las Entidades</option>';
            for (var i = 0; i < data.length; i++) ***REMOVED***
                select = select + '<option value="' + data[i].entidad.toString() + '">' + data[i].entidad.toString() + '</option>';
        ***REMOVED***

            $('#entidadOG').html(select).fadeIn();
            $("#entidadOG").prop("disabled", false);
            $("#selectEntidadOG").prop("class", "selectBlue");
            $('#DistribucionObjetoGasto').attr('nivel', 1);

            treeMapCombosOG(items_result, "treeMapCombosOG", "entidad", "totalEntidad");
    ***REMOVED***
        else ***REMOVED*** 
            $.ajax(***REMOVED***
                url: "api/serviciospresupuesto/ComboEntidadOG/",
                type: "GET",
                data: param,

        ***REMOVED***).done(function (data) ***REMOVED***

                //$('#totalPresupuesto').html(data.infoGrafica);
                //loadLinePlotGastoTiempo(data.infoGrafica, "divGraphBarLinePlotPresupuestoTiempo");
                var items_result = data.infoGrafica;
                
                select = select + '<option value="">Todas las Entidades</option>';
                for (var i = 0; i < items_result.length; i++) ***REMOVED***
                    select = select + '<option value="' + items_result[i].entidad.toString() + '">' + items_result[i].entidad.toString() + '</option>';
            ***REMOVED***

                $('#entidadOG').html(select).fadeIn();
                $('#entidadOG').attr('data-OG' + $.trim(annio) , JSON.stringify(items_result));

                $("#entidadOG").prop("disabled", false);
                $("#selectEntidadOG").prop("class", "selectBlue");
                $('#DistribucionObjetoGasto').attr('nivel', 1);

                treeMapCombosOG(items_result, "treeMapCombosOG", "entidad", "totalEntidad");
        ***REMOVED***).fail(function (handleError) ***REMOVED***
                // Some function
                alert("Error GetComboEntidadG");
                console.log(handleError);
        ***REMOVED***);
    ***REMOVED***

***REMOVED***

function GetComboProyectoActividadOG(annio,  entidad) ***REMOVED***
    var param = "annio=" + annio + "&entidad=" + entidad;
    $("#btnVolverOG").show();
    if (entidad == "") ***REMOVED***

        $("#proyectoActividadOG").prop("disabled", true);
        $("#proyectoActividadOG").val("");
        $("#selectProyectoActividadOG").prop("class", "selectDis");

***REMOVED***
    else ***REMOVED***

        var select = "";
        var data = $('#clasificacion').data('OG' + annio + '-' + $.trim(entidad).replace(/ /g, '_'))
        if (data) ***REMOVED***
            select = select + '<option value="">Todos los Proyectos/Actividades</option>';
            for (var i = 0; i < data.length; i++) ***REMOVED***
                select = select + '<option value="' + data[i].proyectoActividad.toString() + '">' + data[i].proyectoActividad.toString() + '</option>';
        ***REMOVED***
            $('#proyectoActividadOG').html(select).fadeIn();
            $("#selectProyectoActividadOG").prop("class", "selectBlue");
            $('#DistribucionObjetoGasto').attr('nivel', 2);
            treeMapCombosOG(items_result, "treeMapCombosOG", "proyectoActividad", "totalProyectoActividad");
    ***REMOVED***
            else ***REMOVED*** 
            $.ajax(***REMOVED***
                url: "api/serviciospresupuesto/ComboProyectoActividadOG/",
                type: "GET",
                data: param,

        ***REMOVED***).done(function (data) ***REMOVED***


                var items_result = data.infoGrafica;
               
                select = select + '<option value="">Todos los Proyectos/Actividades</option>';
                for (var i = 0; i < items_result.length; i++) ***REMOVED***
                    select = select + '<option value="' + items_result[i].proyectoActividad.toString() + '">' + items_result[i].proyectoActividad.toString() + '</option>';
            ***REMOVED***
                $('#proyectoActividadOG').html(select).fadeIn();
               

                $('#proyectoActividadOG').attr('data-OG' + annio + '-' + $.trim(entidad).replace(/ /g, '_'), JSON.stringify(items_result));


                //$("#proyectoActividad").prop("disabled", false);
                $("#selectProyectoActividadOG").prop("class", "selectBlue");
                $('#DistribucionObjetoGasto').attr('nivel', 2);
                treeMapCombosOG(items_result, "treeMapCombosOG", "proyectoActividad", "totalProyectoActividad");
                //$("#clasePrograma").val("");

        ***REMOVED***).fail(function (handleError) ***REMOVED***
                // Some function
                alert("Error selectProyectoActividadOG");
                console.log(handleError);
        ***REMOVED***);
    ***REMOVED***

***REMOVED***
***REMOVED***

function GetComboObjetoGasto(annio, entidad, proyectoActividad) ***REMOVED***
    var param = "annio=" + annio + "&entidad=" + entidad + "&proyectoActividad=" + proyectoActividad;
    if (proyectoActividad == "") ***REMOVED***

        //$("#proyectoActividad").prop("disabled", true);
        //$("#proyectoActividad").val("");
        $("#selectObjetoGasto").prop("class", "selectDis");

***REMOVED***
    else ***REMOVED***

        var data = $('#objetoGasto').data('OG'+annio +  '-' + $.trim(entidad).replace(/ /g, '_') + '-' + $.trim(proyectoActividad).replace(/ /g, '_'));
        if (data) ***REMOVED***
            $("#selectObjetoGasto").prop("class", "selectBlue");
            $('#DistribucionObjetoGasto').attr('nivel', 3);
            treeMapCombosOG(data, "treeMapCombosOG", "labelGroup", "totalPresupuesto");
    ***REMOVED***
        //    else ***REMOVED*** 
        $.ajax(***REMOVED***
            url: "api/serviciospresupuesto/ComboObjetoGasto/",
            type: "GET",
            data: param,

    ***REMOVED***).done(function (data) ***REMOVED***


            var items_result = data.infoGrafica;


            $('#ObjetoGasto').attr('data-OG' + annio +  '-' + $.trim(entidad).replace(/ /g, '_') + '-' + $.trim(proyectoActividad).replace(/ /g, '_'), JSON.stringify(items_result));


            //$("#proyectoActividad").prop("disabled", false);
            $("#selectObjetoGasto").prop("class", "selectBlue");
            $('#DistribucionObjetoGasto').attr('nivel', 3);
            treeMapCombosOG(items_result, "treeMapCombosOG", "labelGroup", "totalPresupuesto");
            //$("#clasePrograma").val("");

    ***REMOVED***).fail(function (handleError) ***REMOVED***
            // Some function
            alert("Error GetComboObjetoGasto");
            console.log(handleError);
    ***REMOVED***);
        /****REMOVED****/

***REMOVED***
***REMOVED***

function elegirChangeOG(nivel, consulta) ***REMOVED***
    //alert(nivel + "  " + consulta);
    if (nivel == 1) ***REMOVED***

        GetComboEntidadOG($("#annioPresupuesto option:selected").val());
***REMOVED***
    if (nivel == 2) ***REMOVED***

        $("#entidadOG").val(consulta);
        changeEntidadOG(consulta)
***REMOVED***
    if (nivel == 3) ***REMOVED***
        $("#proyectoActividadOG").val(consulta);
        changeProyectoActividadOG(consulta)
***REMOVED***
***REMOVED***

function changeEntidadOG(consulta) ***REMOVED***
    $("#proyectoActividad").prop("disabled", true);
    $("#proyectoActividad").val("");
    $("#selectProyectoActividad").prop("class", "selectDis");
    $("#selectObjetoGasto").prop("class", "selectDis");
    GetComboProyectoActividadOG($("#annioPresupuesto option:selected").val(),consulta);
***REMOVED***

function changeProyectoActividadOG(consulta) ***REMOVED***

    $("#selectObjetoGasto").prop("class", "selectDis");
    GetComboObjetoGasto($("#annioPresupuesto option:selected").val(), $("#entidadOG option:selected").val(), consulta);
***REMOVED***

$(document).ready(function () ***REMOVED***
    ///Eventos enlaces grafica Distribucion del gasto treemap
    $('#topSectores').click(function () ***REMOVED***

        GetTreeMap($(this).attr("cons"), $("#annioPresupuesto option:selected").val());
***REMOVED***);
    $('#todosSectores').click(function () ***REMOVED***
        if ($(this).hasClass("bg-noactive")) ***REMOVED*** $(this).removeClass("bg-noactive"); $(this).addClass("bg-active"); $("#todosEntidades").removeClass("bg-active"); $("#todosEntidades").addClass("bg-noactive"); ***REMOVED***
        GetTreeMap($(this).attr("cons"), $("#annioPresupuesto option:selected").val());
***REMOVED***);
    $('#todosEntidades').click(function () ***REMOVED***
        if ($(this).hasClass("bg-noactive")) ***REMOVED*** $(this).removeClass("bg-noactive"); $(this).addClass("bg-active"); $("#todosSectores").removeClass("bg-active"); $("#todosSectores").addClass("bg-noactive"); ***REMOVED***
        GetTreeMap($(this).attr("cons"), $("#annioPresupuesto option:selected").val());
***REMOVED***);

    $('#btnVolverDP').click(function () ***REMOVED***
        GetTreeMap($("#Distribucion").attr("consulta"), $("#annioPresupuesto option:selected").val());
***REMOVED***);

    // Eventos enlaces grafica 2
    $('#topSectoresG').click(function () ***REMOVED***
        if ($(this).hasClass("bg-noactive")) ***REMOVED*** $(this).removeClass("bg-noactive"); $(this).addClass("bg-active"); $("#todosSectoresG").removeClass("bg-active"); $("#todosSectoresG").addClass("bg-noactive"); ***REMOVED***
        GetGastoSectores($(this).attr("cons"), $("#annioPresupuesto option:selected").val());
***REMOVED***);
    $('#todosSectoresG').click(function () ***REMOVED***
        if ($(this).hasClass("bg-noactive")) ***REMOVED*** $(this).removeClass("bg-noactive"); $(this).addClass("bg-active"); $("#topSectoresG").removeClass("bg-active"); $("#topSectoresG").addClass("bg-noactive"); ***REMOVED***
        GetGastoSectores($(this).attr("cons"), $("#annioPresupuesto option:selected").val());
***REMOVED***);

    // Eventos enlaces grafica 3
    $('#topSectoresPSAA').click(function () ***REMOVED***
        //alert($(this).attr("id"));
        if ($(this).hasClass("bg-noactive")) ***REMOVED*** $(this).removeClass("bg-noactive"); $(this).addClass("bg-active"); $("#todosSectoresPSAA").removeClass("bg-active"); $("#todosSectoresPSAA").addClass("bg-noactive"); ***REMOVED***
        $('#version1').attr('consulta', $(this).attr("cons"));
        GetDatosGastoPresupuestalSolicitadoVAprobado($(this).attr("cons"), $("#annioPresupuesto option:selected").val(), $("#version1 option:selected").val(), $("#version2 option:selected").val());
***REMOVED***);
    $('#todosSectoresPSAA').click(function () ***REMOVED***
        //alert($("#todosSectoresPSA").hasClass("bg-noactive"));
       
        if ($(this).hasClass("bg-noactive")) ***REMOVED*** 
            $(this).removeClass("bg-noactive"); $(this).addClass("bg-active"); $("#topSectoresPSAA").removeClass("bg-active"); $("#topSectoresPSAA").addClass("bg-noactive");
    ***REMOVED***
        $('#version1').attr('consulta', $(this).attr("cons"));
        GetDatosGastoPresupuestalSolicitadoVAprobado($(this).attr("cons"), $("#annioPresupuesto option:selected").val(), $("#version1 option:selected").val(), $("#version2 option:selected").val());
***REMOVED***);

    // Eventos enlaces grafica 3
    $('#ultimos5APT').click(function () ***REMOVED***
      //  if ($(this).hasClass("bg-noactive")) ***REMOVED*** $(this).removeClass("bg-noactive"); $(this).addClass("bg-active"); $("#annioPT").removeClass("bg-active"); $("#annioPT").addClass("bg-noactive"); ***REMOVED***
        GetDatosGastoPresupuestalTiempo($(this).attr("cons"), $("#annioPresupuesto option:selected").val());
***REMOVED***);
    $('#annioPT').click(function () ***REMOVED***
        if ($(this).hasClass("bg-noactive")) ***REMOVED*** $(this).removeClass("bg-noactive"); $(this).addClass("bg-active"); $("#ultimos5APT").removeClass("bg-active"); $("#ultimos5APT").addClass("bg-noactive"); ***REMOVED***
        GetDatosGastoPresupuestalTiempo($(this).attr("cons"), $("#annioPresupuesto option:selected").val());
***REMOVED***);


    // Eventos enlaces grafica grupo de gasto
    $('#topGruposG').click(function () ***REMOVED***
        if ($(this).hasClass("bg-noactive")) ***REMOVED*** $(this).removeClass("bg-noactive"); $(this).addClass("bg-active"); $("#todosGruposG").removeClass("bg-active"); $("#todosGruposG").addClass("bg-noactive"); ***REMOVED***
        GetGrupoDeGasto($(this).attr("cons"), $("#annioPresupuesto option:selected").val());
***REMOVED***);
    $('#todosGruposG').click(function () ***REMOVED***
        if ($(this).hasClass("bg-noactive")) ***REMOVED*** $(this).removeClass("bg-noactive"); $(this).addClass("bg-active"); $("#topGruposG").removeClass("bg-active"); $("#topGruposG").addClass("bg-noactive"); ***REMOVED***
        GetGrupoDeGasto($(this).attr("cons"), $("#annioPresupuesto option:selected").val());
***REMOVED***);


    $("#clasificacion").on("change", function (event) ***REMOVED***
        if ($(this).val() == "") ***REMOVED***
            elegirChange(1,"");
    ***REMOVED***
        else ***REMOVED***
            elegirChange(2, $(this).val());//changeClasificacion($(this).val());
    ***REMOVED***
***REMOVED***);

    $("#entidad").on("change", function (event) ***REMOVED***
        /*      alert($("#selectClasePrograma option:selected").val());*/
        // changeEntidad($(this).val());
        if ($(this).val() == "") ***REMOVED***
            elegirChange(2, $("#clasificacion option:selected").val());
    ***REMOVED***
        else ***REMOVED***
            elegirChange(3, $(this).val());//changeClasificacion($(this).val());
    ***REMOVED***
***REMOVED***);

    $("#clasePrograma").on("change", function (event) ***REMOVED***
    /*      alert($("#selectClasePrograma option:selected").val());*/
       // changeClasePrograma($(this).val());

        if ($(this).val() == "") ***REMOVED***
            elegirChange(3, $("#entidad option:selected").val());
    ***REMOVED***
        else ***REMOVED***
            elegirChange(4, $(this).val());//changeClasificacion($(this).val());
    ***REMOVED***
***REMOVED***);




    $("#annioPresupuesto").on("change", function (event) ***REMOVED***
        inicializaDatos();
***REMOVED***);

    $("#version1").on("change", function (event) ***REMOVED***
        //alert($("#version1 option:selected").val());
        GetDatosGastoPresupuestalSolicitadoVAprobado($('#version1').attr('consulta'), $("#annioPresupuesto option:selected").val(), $("#version1 option:selected").val(), $("#version2 option:selected").val());
***REMOVED***);

    $("#version2").on("change", function (event) ***REMOVED***
        GetDatosGastoPresupuestalSolicitadoVAprobado($('#version1').attr('consulta'), $("#annioPresupuesto option:selected").val(), $("#version1 option:selected").val(), $("#version2 option:selected").val());
***REMOVED***);
    

    $('#btnVolver').click(function () ***REMOVED***
        nivel = $('#DistribucionProgramas').attr('nivel')*1-1
        if (nivel == 1) ***REMOVED***
            elegirChange(1, "");
    ***REMOVED***
        if (nivel == 2) ***REMOVED***
            elegirChange(2, $("#clasificacion option:selected").val());
    ***REMOVED***
        if (nivel == 3) ***REMOVED***
            elegirChange(3, $("#entidad option:selected").val());
    ***REMOVED***
        //if (nivel == 4) ***REMOVED***
        //    elegirChange(1, "");
        //***REMOVED***
***REMOVED***);

    $('#btnLimpiar').click(function () ***REMOVED***
       
            elegirChange(1, "");
       
***REMOVED***);



    $("#entidadOG").on("change", function (event) ***REMOVED***
        if ($(this).val() == "") ***REMOVED***
            elegirChangeOG(1, "");
    ***REMOVED***
        else ***REMOVED***
            elegirChangeOG(2, $(this).val());//changeClasificacion($(this).val());
    ***REMOVED***
***REMOVED***);

    $("#proyectoActividadOG").on("change", function (event) ***REMOVED***
        /*      alert($("#selectClasePrograma option:selected").val());*/
        // changeEntidad($(this).val());
        if ($(this).val() == "") ***REMOVED***
            elegirChangeOG(2, $("#entidadOG option:selected").val());
    ***REMOVED***
        else ***REMOVED***
            elegirChangeOG(3, $(this).val());//changeClasificacion($(this).val());
    ***REMOVED***
***REMOVED***);

    $('#btnVolverOG').click(function () ***REMOVED***
        nivel = $('#DistribucionObjetoGasto').attr('nivel') * 1 - 1
        if (nivel == 1) ***REMOVED***
            elegirChangeOG(1, "");
    ***REMOVED***
        if (nivel == 2) ***REMOVED***
            elegirChangeOG(2, $("#entidadOG option:selected").val());
    ***REMOVED***

***REMOVED***);

    $('#btnLimpiarOG').click(function () ***REMOVED***

        elegirChangeOG(1, "");

***REMOVED***);

***REMOVED***);

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
