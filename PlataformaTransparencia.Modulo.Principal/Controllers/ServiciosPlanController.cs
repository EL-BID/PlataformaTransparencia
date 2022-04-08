using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PlataformaTransparencia.Infrastructura.DataModels;
using PlataformaTransparencia.Modelos;
using PlataformaTransparencia.Modelos.Plan;
using PlataformaTransparencia.Negocios.Home;
using PlataformaTransparencia.Negocios.PlanNacional;
using PlataformaTransparencia.Negocios.Entidad;
using SolrNet;

namespace PlataformaTransparencia.Modulo.Principal.Controllers
***REMOVED***
  [Route("api/serviciosplan")]
  public class ServiciosPlanController : Controller
  ***REMOVED***
    private readonly ILogger<ServiciosPlanController> _logger;
    private readonly TransparenciaDB _connection;
    private ISolrOperations<PlataformaTransparencia.Modelos.Proyectos.Proyecto> _solr;

    public ServiciosPlanController(ILogger<ServiciosPlanController> logger, TransparenciaDB connection, ISolrOperations<PlataformaTransparencia.Modelos.Proyectos.Proyecto> solr)
    ***REMOVED***
          _logger = logger;
          _connection = connection;
          _solr = solr;

    ***REMOVED***


    [HttpGet("GetEjesEstrategicos")]
    public ModelPlanData GetEjesEstrategicos()
    ***REMOVED***
      ModelPlanData objReturn = new ModelPlanData();
      try 
      ***REMOVED***
        objReturn.EjesEstrategicos = (from ejes in _connection.VinculacionIndicadoresPNDXEntidadesStps0
                                      where ejes.CodEjeEstrategico.HasValue
                                      select new EjeEstrategico ***REMOVED***
                                        Nombre = "Eje " + ejes.CodEjeEstrategico.Value + ": " + ejes.NombreEjeEstrategico,
                                        Descripcion = ejes.DescripcionEjeEstrategico,
                                        Id = ejes.CodEjeEstrategico.Value
                                  ***REMOVED***).Distinct().OrderBy(x=>x.Nombre).ToList();
        objReturn.Status = true;
        return objReturn;
  ***REMOVED***
      catch (Exception exception) 
      ***REMOVED***
        objReturn.Status = false;
        objReturn.Message = "Error: " + exception.Message;
        return objReturn;
  ***REMOVED***
***REMOVED***


    [HttpGet("GetObjetivosGeneralesXEjeEstrategico")]
    public ModelPlanData GetObjetivosGeneralesXEjeEstrategico(string idEje)
    ***REMOVED***
      ModelPlanData objReturn = new ModelPlanData();
      try ***REMOVED***
        var aux = new PlanNacionalBLL(_connection);
        int idEjeEstrategico = Convert.ToInt32(idEje);
        objReturn.ObjetivosPorEjeEstrategico = aux.ObtenerObjetivosPorEjeEstrategico(idEjeEstrategico);
        objReturn.Status = true;
        return objReturn;
  ***REMOVED***
      catch (Exception exception) ***REMOVED***
        objReturn.Status = false;
        objReturn.Message = "Error: " + exception.Message;
        return objReturn;
  ***REMOVED***
***REMOVED***


    [HttpGet("GetEntidadesPlanNacional")]
    public List<InfoEntidad> GetEntidadesPlanNacional()
    ***REMOVED***
      List<InfoEntidad> objReturn = new List<InfoEntidad>();
      try ***REMOVED***
        var aux = new PlanNacionalBLL(_connection);
        objReturn = aux.ObtenerEntidadesPlanNacional();
        return objReturn;
  ***REMOVED***
      catch (Exception) ***REMOVED***
        return objReturn;
  ***REMOVED***
***REMOVED***

    [HttpGet("GetIndicadoresXIdObjetivoEspecifico")]
    public List<IndicadorObjetivoEspecifico> GetIndicadoresXIdObjetivoEspecifico(string idEje, string idObjetivoEstrategico, string idObjetivoEspecifico)
    ***REMOVED***
      List<IndicadorObjetivoEspecifico> objReturn = new List<IndicadorObjetivoEspecifico>();
      try ***REMOVED***
        var aux = new PlanNacionalBLL(_connection);
        if (int.TryParse(idEje, out int idEjeEstrategico) && int.TryParse(idObjetivoEstrategico, out int idObjEstrategico) && int.TryParse(idObjetivoEspecifico, out int idObjEspecifico)) ***REMOVED***
          objReturn = aux.ObtenerIndicadoresXIdObjetivoEspecifico(idEjeEstrategico, idObjEstrategico, idObjEspecifico);
    ***REMOVED***
        return objReturn;
  ***REMOVED***
      catch (Exception) ***REMOVED***
        return objReturn;
  ***REMOVED***
***REMOVED***



***REMOVED***
***REMOVED***
