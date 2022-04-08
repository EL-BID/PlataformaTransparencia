GetProyectoById();

//alert("holaaaa");

function GetProyectoById() ***REMOVED***
    $.ajax(***REMOVED***
        url: "/api/servicioshome/GetAllAsync",
        type: "GET",
        data: null,

***REMOVED***).done(function (data) ***REMOVED***
        // Some function
        alert("hecho");
***REMOVED***).fail(function (handleError) ***REMOVED***
        // Some function
        alert("fail");
***REMOVED***);
***REMOVED***


