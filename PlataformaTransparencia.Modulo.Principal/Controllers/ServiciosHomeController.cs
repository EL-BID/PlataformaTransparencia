using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AngleSharp.Dom.Events;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PlataformaTransparencia.Infrastructura.DataModels;
using PlataformaTransparencia.Modelos;
using PlataformaTransparencia.Negocios;
using PlataformaTransparencia.Negocios.BLL.Contracts;
using PlataformaTransparencia.Negocios.Entidad;
using PlataformaTransparencia.Negocios.Home;
using SolrNet;
using SolrNet.Commands.Parameters;

namespace PlataformaTransparencia.Modulo.Principal.Controllers
***REMOVED***
  [Route("api/servicioshome")]

  public class ServiciosHomeController : Controller
  ***REMOVED***
    private readonly ILogger<ServiciosHomeController> _logger;
    private readonly TransparenciaDB _connection;
    private ISolrOperations<PlataformaTransparencia.Modelos.Proyectos.Proyecto> _solr;
    private IConsolidadosNacionalesBLL consolidadosNacionales;
    private IEntidadBLL consolidadosEntidades;

    public ServiciosHomeController(ILogger<ServiciosHomeController> logger, TransparenciaDB connection, ISolrOperations<PlataformaTransparencia.Modelos.Proyectos.Proyecto> solr, IConsolidadosNacionalesBLL consolidadosNacionalesBLL, IEntidadBLL entidadesbll)
    ***REMOVED***
      _logger = logger;
      _connection = connection;
      _solr = solr;
      consolidadosNacionales = consolidadosNacionalesBLL;
      consolidadosEntidades = entidadesbll;

***REMOVED***


    [HttpGet("GetRegAsignados")]
    public ModelHomeData GetRegAsignados()
    ***REMOVED***
      ModelHomeData objReturn = new ModelHomeData();
      try ***REMOVED***
        objReturn.RecursosAsignados = consolidadosNacionales.GetRecursosAsigByObjEstrategico(6);
        objReturn.Status = true;
        return objReturn;
  ***REMOVED***
      catch (Exception exception) ***REMOVED***
        objReturn.Status = false;
        objReturn.Message = "Error: " + exception.Message;
        return objReturn;
  ***REMOVED***




***REMOVED***

    [HttpGet("GetRegAsignadosPerSector")]
    public ModelHomeData GetRegAsignadosPerSector()
    ***REMOVED***
      ModelHomeData objReturn = new ModelHomeData();
      try ***REMOVED***
        objReturn.RecursosBySector = consolidadosNacionales.GetRecursosAsigPerSectoresByObjEstrateg(6);
        objReturn.Status = true;
        return objReturn;
  ***REMOVED***
      catch (Exception exception) ***REMOVED***
        objReturn.Status = false;
        objReturn.Message = "Error: " + exception.Message;
        return objReturn;
  ***REMOVED***




***REMOVED***


    [HttpGet("GetRegAsignadosPerSectorByIdObjetivoEstrategico")]
    public ModelHomeData GetRegAsignadosPerSectorByIdObjetivoEstrategico(string idObjetivoEstrategico)
    ***REMOVED***
      ModelHomeData objReturn = new ModelHomeData();
      try ***REMOVED***
        if (int.TryParse(idObjetivoEstrategico, out int idObjEstrategico)) ***REMOVED***
          objReturn.RecursosBySector = consolidadosNacionales.GetRecursosAsigPerSectoresByObjEstrateg(idObjEstrategico);
          objReturn.Status = true;
    ***REMOVED***
        return objReturn;
  ***REMOVED***
      catch (Exception exception) ***REMOVED***
        objReturn.Status = false;
        objReturn.Message = "Error: " + exception.Message;
        return objReturn;
  ***REMOVED***
***REMOVED***


    [HttpGet("GetConsolidadoEntidadesByObjEspecifico")]
    public ModelHomeData GetConsolidadoEntidadesByObjEspecifico(int id_eje, int id)
    ***REMOVED***
      ModelHomeData objReturn = new ModelHomeData();
      try ***REMOVED***

        objReturn.Entidades = consolidadosNacionales.GetConsolidadoEntidadesByObjEspecifico(id_eje, id);
        objReturn.Status = true;

  ***REMOVED***
      catch (Exception exception) ***REMOVED***
        objReturn.Status = false;
        objReturn.Message = "Error: " + exception.Message;

  ***REMOVED***

      return objReturn;
***REMOVED***



    [HttpGet("GetHistoricoAvanceIndicador")]
    public ModelIndicador GetHistoricoAvanceIndicador(string idIndicador)
    ***REMOVED***
      ModelIndicador objReturn = new ModelIndicador();
      try ***REMOVED***
        var id = Convert.ToInt32(idIndicador);
        objReturn.AvancesIndicador = consolidadosNacionales.GetHistoricoAvanceIndicador(id);
        objReturn.Status = true;

  ***REMOVED***
      catch (Exception exception) ***REMOVED***
        objReturn.Status = false;
        objReturn.Message = "Error: " + exception.Message;

  ***REMOVED***
      return objReturn;
***REMOVED***



    [HttpGet("GetRecursosPerPlan")]
    public ModelHomeData GetRecursosPerPlan()
    ***REMOVED***
      ModelHomeData objReturn = new ModelHomeData();
      try ***REMOVED***
        objReturn.RecursosPerObjeto = consolidadosNacionales.ObtenerRecursosPerPlanGroup();
        objReturn.Status = true;
        return objReturn;
  ***REMOVED***
      catch (Exception exception) ***REMOVED***
        objReturn.Status = false;
        objReturn.Message = "Error: " + exception.Message;
        return objReturn;
  ***REMOVED***
***REMOVED***

    /// <summary>
    /// sankey entidad
    /// </summary>
    /// <param name="codEntidad"></param>
    /// <returns></returns>
    [HttpGet("GetGraficaSankey")]
    public ModelGraficaSankey GetGraficaSankey(string codEntidad)
    ***REMOVED***
      ModelGraficaSankey objReturn = new ModelGraficaSankey();
      try ***REMOVED***
        objReturn.distribucionObjetivos = consolidadosEntidades.GetGraficaSankey(codEntidad);
        objReturn.Status = true;
        return objReturn;
  ***REMOVED***
      catch (Exception exception) ***REMOVED***
        objReturn.Status = false;
        objReturn.Message = "Error: " + exception.Message;
        return objReturn;
  ***REMOVED***

***REMOVED***


    ///ejemplo llamado get varios parametros
    //[HttpGet("obtCiudades/***REMOVED***city***REMOVED***/***REMOVED***country***REMOVED***")]
    //public string obtCiudades(string city, string country)
    //***REMOVED***
    //    return "obtCiudades";
    //***REMOVED***

    //[HttpGet("obtPais/***REMOVED***continente***REMOVED***")]
    //public string obtPais(string continente)
    //***REMOVED***
    //    return "obtPais";
    //***REMOVED***
  ***REMOVED***

***REMOVED***

