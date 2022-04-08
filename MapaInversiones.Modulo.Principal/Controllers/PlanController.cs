using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PlataformaTransparencia.Infrastructura.DataModels;
using PlataformaTransparencia.Modelos;
using PlataformaTransparencia.Modelos.Plan;

namespace PlataformaTransparencia.Modulo.Principal.Controllers
***REMOVED***
  public class PlanController : Controller
  ***REMOVED***
        private readonly ILogger<PlanController> _logger;
        private readonly TransparenciaDB _connection;



    public PlanController(ILogger<PlanController> logger, TransparenciaDB connection)
    ***REMOVED***
        _logger = logger;
        _connection = connection;

***REMOVED***

    
    public IActionResult Index()
    ***REMOVED***
      return View();
***REMOVED***
    public IActionResult PlanNacional()
    ***REMOVED***
      //ModelPlanData modelo = new ModelPlanData();
      ////List<EjeEstrategico> listEje = new List<EjeEstrategico>();
      //modelo.EjesEstrategicos = (from ejes in _connection.EjeEstrategicoes
      //                           where ejes.PlanId == 9
      //                           select new EjeEstrategico ***REMOVED***
      //                             Nombre = ejes.Nombre,
      //                             Descripcion = ejes.Descripcion,
      //                             Id = ejes.Id
      //                       ***REMOVED***).ToList();
      //ViewData["EjesEstrategicos"] = modelo.EjesEstrategicos;
      //modelo.Ejes = listEje;
      //return View(modelo);
      ViewData["ruta"] = "Planificación";
      return View();
***REMOVED***
    public IActionResult PerfilPrograma()
    ***REMOVED***
      return View();
***REMOVED***

    public IActionResult ProcesoPlanNacional()
    ***REMOVED***
      ViewData["ruta"] = "Planificación";
      return View();
***REMOVED***

        public IActionResult pruebaGrafica()
        ***REMOVED***
            return View();
    ***REMOVED***
***REMOVED***
***REMOVED***
