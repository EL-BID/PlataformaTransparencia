using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.DependencyInjection;
using PlataformaTransparencia.Infrastructura;

namespace PlataformaTransparencia.Negocios
***REMOVED***
    public class ServicesRegister
    ***REMOVED***
        private readonly IServiceCollection _services;
        public ServicesRegister(IServiceCollection services)
        ***REMOVED***
            _services = services;
    ***REMOVED***

        public void RegisterDBContext()
        ***REMOVED***
            _services.AddTransient(typeof(LinqToDB.IDataContext),typeof(Infrastructura.DataModels.TransparenciaDB));
    ***REMOVED***
***REMOVED***
***REMOVED***
