﻿$( function() ***REMOVED***
 
  $("#SearchString").autocomplete(***REMOVED***
      source: function (request, response) ***REMOVED***
          
          $.ajax(***REMOVED***
              type: 'GET',
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              url: "AutocompleteSearch/" + request.term,
                cache: false,
                /*ta: '***REMOVED***"keywords":"' + request.term + '"***REMOVED***',*/
                success: function (data) ***REMOVED***
                    var datos = data;
                        response($.map(datos, function (item) ***REMOVED***
                            return item.principal;
                    ***REMOVED***
                      ));
              ***REMOVED***
              error: function (response) ***REMOVED***
                  alert(response.responseText);
             ***REMOVED***
                failure: function (response) ***REMOVED***
                  alert(response.responseText);
          ***REMOVED***
        ***REMOVED***);
      ***REMOVED***
        delay: 300,
        minLength: 5
  ***REMOVED***);

    //$('#HierarchySearch').click(function () ***REMOVED***
    //    var val_sel = $(this).attr("data-title");
    //    $("#ulPaginacion").attr("refine", val_sel);
    //   // alert(val_sel);
    //    if (val_sel + "" != "") ***REMOVED***
    //        $.ajax(***REMOVED***
    //            type: 'GET',
    //            contentType: "application/json; charset=utf-8",
    //            dataType: "json",
    //            url: "BusquedaResultados/?SearchString=" + val_sel,
    //            cache: false,
    //            /*ta: '***REMOVED***"keywords":"' + request.term + '"***REMOVED***',*/
    //            success: function (data) ***REMOVED***
    //                console.log(data.result);   
    //          ***REMOVED***
    //            error: function (response) ***REMOVED***
    //                alert(response.responseText);
    //          ***REMOVED***
    //            failure: function (response) ***REMOVED***
    //                alert(response.responseText);
    //        ***REMOVED***
    //    ***REMOVED***);
    //***REMOVED***

    //***REMOVED***);

    $('.hover-link').click(function () ***REMOVED***
        var val_sel = $(this).attr("data-title");
        //var val_input = document.getElementById('page-field-search').value;
        $("#tipoRefine").html('"' + val_sel+'"');
        $("#ulPaginacion").attr("refine", val_sel);
        getListResult(0, true);
        //alert(val_sel);
        //if (val_sel + "" != "") ***REMOVED***
        //    $.ajax(***REMOVED***
        //        type: 'GET',
        //        contentType: "application/json; charset=utf-8",
        //        dataType: "json",
        //        url: "/BusquedaAsync/?SearchString=" + val_input + "&type=" + val_sel,
        //        cache: false,
        //        /*ta: '***REMOVED***"keywords":"' + request.term + '"***REMOVED***',*/
        //        success: function (data) ***REMOVED***
        //            var Resultados = document.getElementById("SearchResults");
        //            Resultados.innerHTML = "";
        //            var htmlResultados = "";
        //            if (data != null && data.length > 0) ***REMOVED***
        //                for (var i = 0; i < data.length; i++) ***REMOVED***
        //                    htmlResultados += "<div class='card card-info-wide'>" +
        //                        "<div class='card-body'>" +
        //                        "<a href='" + data[i].url + "' class='h5' title='" + data[i].nombreProyecto + "'>" + data[i].nombreProyecto + "</a>" +
        //                        "<div class='card-posted-in card-wide-item'>" +
        //                        "<a href='' class='card-category' title='" + data[i].sector + "'>" + data[i].sector + "</a>" +
        //                        "<a href='' class='card-category' title='" + data[i].type + "'> - " + data[i].type + "</a>" +
        //                        "</div>" +
        //                        "</div>" +
        //                        "</div>" 
        //            ***REMOVED***

        //        ***REMOVED***
        //            Resultados.innerHTML = htmlResultados;
        //      ***REMOVED***
        //        error: function (response) ***REMOVED***
        //            alert(response.responseText);
        //      ***REMOVED***
        //        failure: function (response) ***REMOVED***
        //            alert(response.responseText);
        //    ***REMOVED***
        //***REMOVED***);
        //***REMOVED***


***REMOVED***);

    $("#ulPaginacion").on("click", "li", function (e) ***REMOVED***
       // alert(getEventTarget(e).getAttribute("id"));
        var $target = $(e.target);
        var index = $target.attr("pagina");
        //var actual = $("")
       // alert(index);
      

        if (!isNaN(index)) ***REMOVED***
            $target.siblings().removeClass("active");
            $target.addClass("active");
            getListResult(index*1);
            $("#ulPaginacion").attr("actual", ((index <0)? 0:index));
    ***REMOVED*** else ***REMOVED***
            if (index === "ap" && !$target.hasClass("pagination-item-disabled")) ***REMOVED***
                getListResult(1 * $("#ulPaginacion").attr("siguiente"), true); // se envia la pagina a la que se quiere ir, booleano para indicar que se debe volver a paginar, cual boton fue el que se seleccionó
        ***REMOVED***
            if (index === "bp" && !$target.hasClass("pagination-item-disabled") ) ***REMOVED***
                getListResult(1 * $("#ulPaginacion").attr("anterior"), true); // se envia la pagina a la que se quiere ir, booleano para indicar que se debe volver a paginar, cual boton fue el que se seleccionó
        ***REMOVED***

            if (index === "fp" && !$target.hasClass("pagination-item-disabled")) ***REMOVED***
                getListResult(1 * $("#ulPaginacion").attr("inicial"), true); // se envia la pagina a la que se quiere ir, booleano para indicar que se debe volver a paginar, cual boton fue el que se seleccionó
        ***REMOVED***
            if (index === "lp" && !$target.hasClass("pagination-item-disabled")) ***REMOVED***
                getListResult(1 * $("#ulPaginacion").attr("final"), true); // se envia la pagina a la que se quiere ir, booleano para indicar que se debe volver a paginar, cual boton fue el que se seleccionó
        ***REMOVED***
               
    ***REMOVED***


        
***REMOVED***);
***REMOVED***);

function getEventTarget(e) ***REMOVED***
    e = e || window.event;
    return e.target || e.srcElement;
***REMOVED***


function pintarPaginacion(totalResultados, pagina) ***REMOVED*** //total de resultados y pagina en la que inicia la fila a mostrar en la paginacion
    var totalR = totalResultados * 1;
    //var val_sel = $("#ulPaginacion").attr("refine");


    // $("#ulPaginacion").attr("refine", "");
    var rows = $("#ulPaginacion").attr("rows") * 1
    var paginasimp = $("#ulPaginacion").attr("paginasimp") * 1


    var paginasfor = paginasimp; //cantidad de paginas a mostrar en el for de impresion
    var paginas = (Math.ceil(totalR / rows)); // 10 rows por pagina y se calcula cuantas paginas hay en total
    var final = paginas - (paginas % paginasimp); //se calcula la pagina inicial del bloque final en la paginacoin ;

    var siguiente = pagina + 1
    var anterior = pagina - 1;

    var siguienteb = $("#ulPaginacion").attr("siguienteb") * 1;
    var anteriorb = $("#ulPaginacion").attr("anteriorb") * 1;

    if (siguienteb < pagina + 1 && final <= pagina + 1) ***REMOVED*** siguienteb = final + paginasimp; ***REMOVED***
    else if (siguienteb < pagina + 1 && final > pagina + 1) ***REMOVED*** siguienteb = siguienteb + paginasimp; ***REMOVED***
    else if (pagina > 0 && pagina < siguienteb - paginasimp) ***REMOVED*** siguienteb = siguienteb - paginasimp; ***REMOVED***
    else if (pagina == 0) ***REMOVED*** siguienteb = paginasimp; ***REMOVED***
    anteriorb = siguienteb - paginasimp;


    var hasta = ((siguienteb > paginas) ? paginas : siguienteb);


    $("#ulPaginacion").attr("anterior", anterior);
    $("#ulPaginacion").attr("siguiente", siguiente);
    $("#ulPaginacion").attr("anteriorb", anteriorb);
    $("#ulPaginacion").attr("siguienteb", siguienteb);
    $("#ulPaginacion").attr("final", final);

    var activo = false;

    var htmlPaginacion = " <li class='pagination-item-arrow pagination-item-arrow-first " + (pagina < paginasimp ? "pagination-item-disabled" : "pagination-item-enabled") + "  material-icons md-24' pagina='fp'>first_page</li>" +
        "<li class='pagination-item-arrow pagination-item-arrow-prev " + ((anterior < 0) ? "pagination-item-disabled" : "pagination-item-enabled") + " material-icons md-24' pagina = 'bp' > chevron_left</li >";

    for (var g = (siguienteb - paginasimp); g < (hasta); g++) ***REMOVED***
        if (g == pagina) ***REMOVED*** activo = true; ***REMOVED*** else ***REMOVED*** activo = false; ***REMOVED***
        if (activo) ***REMOVED***
            htmlPaginacion += " <li pagina='" + g + "' class='paginacion active'>" + (g * 1 + 1) + "</li>";

    ***REMOVED***
        else ***REMOVED***
            htmlPaginacion += " <li pagina='" + g + "' class='paginacion'>" + (g * 1 + 1) + "</li>";
            activo = 0;
    ***REMOVED***

***REMOVED***
    htmlPaginacion += " <li class='pagination-item-arrow pagination-item-arrow-next material-icons md-24 " + ((siguiente >= paginas) ? "pagination-item-disabled" : "pagination-item-enabled") + " ' pagina='ap'>chevron_right</li>" +
        " <li class='pagination-item-arrow pagination-item-arrow-last material-icons md-24 " + ((siguienteb >= paginas) ? "pagination-item-disabled" : "pagination-item-enabled") + " ' pagina='lp'>last_page</li>";

    $("#ulPaginacion").html(htmlPaginacion);
***REMOVED***

function getListResult(pagina, repaginar=false ) ***REMOVED***
   // alert(start);
    var val_sel = $("#ulPaginacion").attr("refine");
    var val_input = document.getElementById('page-field-search').value;
    var val_start = pagina * $("#ulPaginacion").attr("rows");
    var val_sort = $("#selectOrden option:selected").val()*1;
    
    var totalResultados = 0;
    
    //alert(val_sel);
        $.ajax(***REMOVED***
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "/BusquedaAsync/?SearchString=" + val_input + "&type=" + val_sel + "&start=" + val_start + "&sort=" + val_sort,
            cache: false,
            /*ta: '***REMOVED***"keywords":"' + request.term + '"***REMOVED***',*/
            success: function (data) ***REMOVED***
                var Resultados = document.getElementById("SearchResults");
                Resultados.innerHTML = "";
                var htmlResultados = "";
                if (data != null && data.length > 0) ***REMOVED***
                    for (var i = 0; i < data.length; i++) ***REMOVED***
                        htmlResultados += "<div class='card card-info-wide'>" +
                            "<div class='card-body'>" +
                            "<a href='" + data[i].url + "' class='h5' title='" + data[i].nombreProyecto + "'>" + data[i].nombreProyecto + "</a>" +
                            "<div class='card-posted-in card-wide-item'>" +
                            "<a href='' class='card-category' title='" + data[i].sector + "'>" + data[i].sector + "</a>" +
                            "<a href='' class='card-category' title='" + data[i].type + "'> - " + data[i].type + "</a>" +
                            "</div>" +
                            "</div>" +
                            "</div>"
                ***REMOVED***

            ***REMOVED***
                Resultados.innerHTML = htmlResultados;
                if (repaginar) ***REMOVED***
                    totalResultados = ((data.length > 0) ? data[0].numFound : data.length);
                    pintarPaginacion(totalResultados, pagina);
            ***REMOVED***
          ***REMOVED***
            error: function (response) ***REMOVED***
                alert(response.responseText);
          ***REMOVED***
            failure: function (response) ***REMOVED***
                alert(response.responseText);
        ***REMOVED***
    ***REMOVED***);
    

***REMOVED***

$("#selectOrden").on("change", function (event) ***REMOVED***
    getListResult(0,true);
***REMOVED***);