using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Razor;

namespace PlataformaTransparencia.Web
***REMOVED***
    public class MyViewLocationExpander : IViewLocationExpander
    ***REMOVED***
        public IEnumerable<string> ExpandViewLocations(ViewLocationExpanderContext context, IEnumerable<string> viewLocations)
        ***REMOVED***
            if (context.ControllerName != null && context.AreaName.Equals("OrchardCore.Users")) ***REMOVED***
                viewLocations = 
                  new[] ***REMOVED*** $"/Views/***REMOVED***context.AreaName***REMOVED***/***REMOVED***context.ControllerName***REMOVED***/***REMOVED***context.ViewName***REMOVED******REMOVED***RazorViewEngine.ViewExtension***REMOVED***"
                  ***REMOVED***.Concat(viewLocations); 
                return viewLocations;
        ***REMOVED***

            return viewLocations;
    ***REMOVED***

        public void PopulateValues(ViewLocationExpanderContext context)
        ***REMOVED***
    ***REMOVED***
***REMOVED***
***REMOVED***
