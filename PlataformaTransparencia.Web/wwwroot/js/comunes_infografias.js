﻿function obtListadoEntidades() ***REMOVED***
    $("#entidadesPlanNacional").empty();
    $.ajax(***REMOVED***
        url: "api/serviciosplan/GetEntidadesPlanNacional",
        type: "GET",
        data: null,

***REMOVED***).done(function (data) ***REMOVED***
        var entidadPlanNacional = $("#entidadesPlanNacional");
        var htmlList = "";
        for (var i = 0; i < data.length; i++) ***REMOVED***
            htmlList += "<li class='list-group-item'><a href=" + '/PerfilEntidad?codEntidad=' + data[i].codEntidad + ">" + "<span>" + data[i].nombre + "</span><i class='material-icons md-18'>chevron_right</i></a></li>";
    ***REMOVED***
        if (data.length > 0)
            htmlList += "<li class='list-group-item'><a href='/BusquedaResultados?Type=Entidad'>" + "<span>Ver todos</span><i class='material-icons md-18'>chevron_right</i></a></li>";
        $("#entidadesPlanNacional").append(htmlList);

***REMOVED***).fail(function (handleError) ***REMOVED***
        $("#entidadesPlanNacional").empty();
***REMOVED***);



***REMOVED***