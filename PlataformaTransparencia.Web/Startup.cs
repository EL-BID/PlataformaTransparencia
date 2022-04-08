using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PlataformaTransparencia.Infrastructura.DataModels;
using Microsoft.Extensions.Configuration;
using LinqToDB.AspNet;
using LinqToDB.AspNet.Logging;
using LinqToDB.Configuration;
using Microsoft.AspNetCore.Mvc.Razor;
using SolrNet;

namespace PlataformaTransparencia.Web
***REMOVED***
    public class Startup
    ***REMOVED***
        public Startup(IConfiguration configuration)
        ***REMOVED***
            Configuration = configuration;
    ***REMOVED***
        public IConfiguration Configuration ***REMOVED*** get; ***REMOVED***

        public void ConfigureServices(IServiceCollection services)
        ***REMOVED***
            
            services.AddOrchardCms();
            services
                .AddOrchardCore()
                .AddMvc()
                ;
            services.Configure<RazorViewEngineOptions>(o => ***REMOVED***
                o.ViewLocationExpanders.Add(new MyViewLocationExpander());
        ***REMOVED***);
            services.AddLinqToDbContext<TransparenciaDB>((provider, options) =>
            ***REMOVED***
                options
                .UseSqlServer(Configuration.GetConnectionString("PISGREntities"))
                .UseDefaultLogging(provider);
        ***REMOVED***);
            services.AddSolrNet<PlataformaTransparencia.Modelos.SolrResponse>(Configuration.GetValue<string>("ConnectionSearchEngine"));

            services.AddTransient(typeof(Negocios.Home.IConsolidadosNacionalesBLL), typeof(Negocios.Home.ConsolidadosNacionalesBLL));
            services.AddTransient(typeof(Negocios.Interfaces.IPlanNacionalBLL), typeof(Negocios.PlanNacional.PlanNacionalBLL));
            services.AddTransient(typeof(Negocios.Entidad.IEntidadBLL), typeof(Negocios.Entidad.EntidadBLL));

    ***REMOVED***

        public void Configure(IApplicationBuilder app, IHostEnvironment env)
        ***REMOVED***
            if (env.IsDevelopment())
            ***REMOVED***
                app.UseDeveloperExceptionPage();
        ***REMOVED***

            app.UseStaticFiles();
            app.UseOrchardCore();
            
    ***REMOVED***
***REMOVED***
***REMOVED***
