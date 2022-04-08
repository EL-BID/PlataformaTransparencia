using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace PlataformaTransparencia.Modulo.Noticias.Controllers
***REMOVED***
    public class NoticiasController : Controller
    ***REMOVED***
        public IActionResult Index()
        ***REMOVED***
            return View();
    ***REMOVED***

        [Route("Noticia/***REMOVED***id***REMOVED***")]
        public IActionResult Noticia(string id)
        ***REMOVED***
            var noticia = new Modelos.NoticiaModel() ***REMOVED*** Id = id ***REMOVED***;
            return View(noticia);
    ***REMOVED***
***REMOVED***

***REMOVED***
