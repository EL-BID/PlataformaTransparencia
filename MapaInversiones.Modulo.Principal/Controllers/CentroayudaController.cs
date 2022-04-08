using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace PlataformaTransparencia.Modulo.Principal.Controllers
***REMOVED***
  public class CentroayudaController : Controller
  ***REMOVED***
    //public IActionResult Index()
    //***REMOVED***
    //  return View();
    //***REMOVED***
    
    public IActionResult Index(int id)
    ***REMOVED***
      try ***REMOVED***
        ViewData["tab"] = id;
  ***REMOVED***
      catch (Exception ex) 
      ***REMOVED***
  ***REMOVED***
      
      return View();
***REMOVED***

    public IActionResult Contactanos()
    ***REMOVED***
      //return Index();
      return View();
***REMOVED***
    public IActionResult Acercade()
    ***REMOVED***
      return View();
***REMOVED***

    public IActionResult MarcoLegal()
    ***REMOVED***
        return View();
***REMOVED***

***REMOVED***
***REMOVED***
