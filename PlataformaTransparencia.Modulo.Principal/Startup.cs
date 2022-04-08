using System;
using AngleSharp.Dom.Events;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using OrchardCore.Modules;
using PlataformaTransparencia.Modelos;
using SolrNet;

namespace PlataformaTransparencia.Modulo.Principal
***REMOVED***
  public class Startup : StartupBase
  ***REMOVED***
    public override void ConfigureServices(IServiceCollection services)
    ***REMOVED***
***REMOVED***

    public override void Configure(IApplicationBuilder builder, IEndpointRouteBuilder routes, IServiceProvider serviceProvider)
    ***REMOVED***
      routes.MapAreaControllerRoute(
      name: "Home",
      areaName: "PlataformaTransparencia.Modulo.Principal",
      pattern: "",
      defaults: new ***REMOVED*** controller = "Home", action = "Index" ***REMOVED***
      );

      routes.MapAreaControllerRoute(
          name: "Noticias",
          areaName: "PlataformaTransparencia.Modulo.Noticias",
          pattern: "Noticias",
          defaults: new ***REMOVED*** controller = "Noticias", action = "Index" ***REMOVED***
      );


      routes.MapAreaControllerRoute(
          name: "Noticia",
          areaName: "PlataformaTransparencia.Modulo.Noticias",
          pattern: "***REMOVED***Noticia***REMOVED***/***REMOVED***id?***REMOVED***",
          defaults: new ***REMOVED*** controller = "Noticias", action = "Noticia" ***REMOVED***
      );

      routes.MapAreaControllerRoute(
          name: "PlanNacional",
          areaName: "PlataformaTransparencia.Modulo.Principal",
          pattern: "PlanNacional",
          defaults: new ***REMOVED*** controller = "Plan", action = "PlanNacional" ***REMOVED***
      );

      routes.MapAreaControllerRoute(
          name: "ProcesoPlanNacional",
          areaName: "PlataformaTransparencia.Modulo.Principal",
          pattern: "ProcesoPlanNacional",
          defaults: new ***REMOVED*** controller = "Plan", action = "ProcesoPlanNacional" ***REMOVED***
      );

      routes.MapAreaControllerRoute(
               name: "Contactanos",
               areaName: "PlataformaTransparencia.Modulo.Principal",
               pattern: "Contactanos",
               defaults: new ***REMOVED*** controller = "CentroAyuda", action = "Contactanos" ***REMOVED***
           );

      routes.MapAreaControllerRoute(
              name: "Acercade",
              areaName: "PlataformaTransparencia.Modulo.Principal",
              pattern: "Acercade",
              defaults: new ***REMOVED*** controller = "CentroAyuda", action = "Acercade" ***REMOVED***
          );


      routes.MapAreaControllerRoute(
                      name: "CentroAyuda",
                      areaName: "PlataformaTransparencia.Modulo.Principal",
                      pattern: "CentroAyuda",
                      defaults: new ***REMOVED*** controller = "CentroAyuda", action = "Index" ***REMOVED***
                  );

      routes.MapAreaControllerRoute(
          name: "Buscar",
          areaName: "PlataformaTransparencia.Modulo.Principal",
          pattern: "Buscar",
          defaults: new ***REMOVED*** controller = "Home", action = "Search" ***REMOVED***
      );

      routes.MapAreaControllerRoute(
          name: "PresupuestoGeneral",
          areaName: "PlataformaTransparencia.Modulo.Principal",
          pattern: "PresupuestoGeneral",
          defaults: new ***REMOVED*** controller = "Presupuesto", action = "PresupuestoGeneral" ***REMOVED***
      );

      routes.MapAreaControllerRoute(
         name: "perfilEntidad",
         areaName: "PlataformaTransparencia.Modulo.Principal",
         pattern: "perfilEntidad",
         defaults: new ***REMOVED*** controller = "Entidad", action = "perfilEntidad" ***REMOVED***
     );
      routes.MapAreaControllerRoute(
          name: "PerfilPrograma",
          areaName: "PlataformaTransparencia.Modulo.Principal",
          pattern: "PerfilPrograma",
          defaults: new ***REMOVED*** controller = "Plan", action = "PerfilPrograma" ***REMOVED***
      );

      routes.MapAreaControllerRoute(
          name: "BusquedaResultados",
          areaName: "PlataformaTransparencia.Modulo.Principal",
          pattern: "BusquedaResultados",
          defaults: new ***REMOVED*** controller = "Home", action = "BusquedaResultados" ***REMOVED***
      );


     routes.MapAreaControllerRoute(
         name: "ProcesoPresupuesto",
         areaName: "PlataformaTransparencia.Modulo.Principal",
         pattern: "ProcesoPresupuesto",
         defaults: new ***REMOVED*** controller = "Presupuesto", action = "ProcesoPresupuesto" ***REMOVED***
     );

    routes.MapAreaControllerRoute(
        name: "pruebaGrafica",
        areaName: "PlataformaTransparencia.Modulo.Principal",
        pattern: "pruebaGrafica",
        defaults: new ***REMOVED*** controller = "Plan", action = "pruebaGrafica" ***REMOVED***
    );


    routes.MapAreaControllerRoute(
        name: "DatosAbiertos",
        areaName: "PlataformaTransparencia.Modulo.Principal",
        pattern: "DatosAbiertos",
        defaults: new ***REMOVED*** controller = "DatosAbiertos", action = "DatosAbiertos" ***REMOVED***
    );

    routes.MapAreaControllerRoute(
            name: "InversionesPrioritarias",
            areaName: "PlataformaTransparencia.Modulo.Principal",
            pattern: "InversionesPrioritarias",
            defaults: new ***REMOVED*** controller = "Home", action = "InversionesPrioritarias" ***REMOVED***
        );

    routes.MapAreaControllerRoute(
            name: "ArticulacionPlan",
            areaName: "PlataformaTransparencia.Modulo.Principal",
            pattern: "ArticulacionPlan",
            defaults: new ***REMOVED*** controller = "Home", action = "ArticulacionPlan" ***REMOVED***
        );

    routes.MapAreaControllerRoute(
                name: "PlanificacionResultados",
                areaName: "PlataformaTransparencia.Modulo.Principal",
                pattern: "PlanificacionResultados",
                defaults: new ***REMOVED*** controller = "Home", action = "PlanificacionResultados" ***REMOVED***
            );

    routes.MapAreaControllerRoute(
        name: "PlanODS",
        areaName: "PlataformaTransparencia.Modulo.Principal",
        pattern: "PlanODS",
        defaults: new ***REMOVED*** controller = "Home", action = "PlanODS" ***REMOVED***
    );

    routes.MapAreaControllerRoute(
            name: "PlanificacionParaguay",
            areaName: "PlataformaTransparencia.Modulo.Principal",
            pattern: "PlanificacionParaguay",
            defaults: new ***REMOVED*** controller = "Home", action = "PlanificacionParaguay" ***REMOVED***
        );

    routes.MapAreaControllerRoute(
            name: "PresupuestoResultados",
            areaName: "PlataformaTransparencia.Modulo.Principal",
            pattern: "PresupuestoResultados",
            defaults: new ***REMOVED*** controller = "Home", action = "PresupuestoResultados" ***REMOVED***
        );

    routes.MapAreaControllerRoute(
            name: "DesarrolloSostenible",
            areaName: "PlataformaTransparencia.Modulo.Principal",
            pattern: "DesarrolloSostenible",
            defaults: new ***REMOVED*** controller = "Home", action = "DesarrolloSostenible" ***REMOVED***
        );

    routes.MapAreaControllerRoute(
                name: "MarcoLegal",
                areaName: "PlataformaTransparencia.Modulo.Principal",
                pattern: "MarcoLegal",
                defaults: new ***REMOVED*** controller = "CentroAyuda", action = "MarcoLegal" ***REMOVED***
            );

    routes.MapAreaControllerRoute(
        name: "POI",
        areaName: "PlataformaTransparencia.Modulo.Principal",
        pattern: "POI",
        defaults: new ***REMOVED*** controller = "Home", action = "POI" ***REMOVED***
    );


        routes.MapAreaControllerRoute(
            name: "PND",
            areaName: "PlataformaTransparencia.Modulo.Principal",
            pattern: "PND",
            defaults: new ***REMOVED*** controller = "Home", action = "PND" ***REMOVED***
        );


    routes.MapAreaControllerRoute(
            name: "Plansectorial",
            areaName: "PlataformaTransparencia.Modulo.Principal",
            pattern: "Plansectorial",
            defaults: new ***REMOVED*** controller = "Home", action = "Plansectorial" ***REMOVED***
        );

    routes.MapAreaControllerRoute(
            name: "PDT",
            areaName: "PlataformaTransparencia.Modulo.Principal",
            pattern: "PDT",
            defaults: new ***REMOVED*** controller = "Home", action = "PDT" ***REMOVED***
        );

    routes.MapAreaControllerRoute(
                    name: "PEI",
                    areaName: "PlataformaTransparencia.Modulo.Principal",
                    pattern: "PEI",
                    defaults: new ***REMOVED*** controller = "Home", action = "PEI" ***REMOVED***
                );
    ***REMOVED***
  ***REMOVED***
***REMOVED***