!function(o){o(".table-editable").dataTable({columns:[{name:"id"***REMOVED***,{name:"age"***REMOVED***,{name:"qty"***REMOVED***,{name:"cost"***REMOVED***],bPaginate:!1,fnRowCallback:function(a,e,n,l){var i=function(a,e){var n=new o.fn.dataTable.Api(".table").cell("td.focus"),l=n.data(),t=document.createElement("div");t.innerHTML=l,t.childNodes.innerHTML=e,console.log("jml a new "+t.innerHTML),n.data(t.innerHTML),c(o(n.node())),o("td.focus a").editable({mode:"inline",success:i***REMOVED***)***REMOVED***;o(".editable").editable({mode:"inline",success:i***REMOVED***)***REMOVED***,autoFill:{columns:[1,2]***REMOVED***,keys:!0***REMOVED***);function c(a){var e=a.attr("data-original-value");if(e){var n=a.text();isNaN(e)||(e=parseFloat(e)),isNaN(n)||(n=parseFloat(n)),e===n?a.removeClass("cat-cell-modified").addClass("cat-cell-original"):a.removeClass("cat-cell-original").addClass("cat-cell-modified")***REMOVED******REMOVED***o("a[data-pk]").on("hidden",function(a,e){c(o(this).parent("td"))***REMOVED***),o(".table").DataTable().on("autoFill",function(a,e,n){o.each(n,function(a,e){var n=e[0].cell;c(o(n.node()))***REMOVED***)***REMOVED***)***REMOVED***(jQuery);