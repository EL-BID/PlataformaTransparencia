using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using OrchardCore.Modules;
using System;

namespace PlataformaTransparencia.Modulo.Noticias
***REMOVED***
    public class Startup : StartupBase
    ***REMOVED***
        public override void ConfigureServices(IServiceCollection services)
        ***REMOVED***
    ***REMOVED***

        public override void Configure(IApplicationBuilder builder, IEndpointRouteBuilder routes, IServiceProvider serviceProvider)
        ***REMOVED***
            routes.MapAreaControllerRoute(
                name: "Noticias",
                areaName: "PlataformaTransparencia.Modulo.Noticias",
                pattern: "Noticias",
                defaults: new ***REMOVED*** controller = "Noticias", action = "Index" ***REMOVED***
            );
    ***REMOVED***
***REMOVED***
***REMOVED***