using System;
using System.Collections.Generic;
using System.Text;
using PlataformaTransparencia.Infrastructura.DataModels;
using PlataformaTransparencia.Modelos;
using PlataformaTransparencia.Modelos.Entidad;
using PlataformaTransparencia.Negocios.Home;

namespace PlataformaTransparencia.Negocios.Entidad
***REMOVED***
  public class EntidadContract : RespuestaContratoBase
  ***REMOVED***
    private readonly TransparenciaDB _connection;
    public ModelEntidadData EntidadModel ***REMOVED*** get; set; ***REMOVED***
  
    public EntidadContract(TransparenciaDB connection)
    ***REMOVED***
      EntidadModel = new ModelEntidadData();
      _connection = connection;
***REMOVED***

    public void Fill(string nombreEntidad, string codEntidad)
    ***REMOVED***
      try ***REMOVED***

        ConsolidadosNacionalesBLL objNegocioConsolidados = new ConsolidadosNacionalesBLL(_connection);
        EntidadModel = objNegocioConsolidados.ObtenerDatosEntidad(codEntidad,nombreEntidad, DateTime.Now.Year+1);
        Status = true;

  ***REMOVED***
      catch (Exception) ***REMOVED***
        Status = false;
        Message = "Lo sentimos, ha ocurrido un error.";
  ***REMOVED***
***REMOVED***
    public string ObtenerNombreEntidad(string codEntidad)
    ***REMOVED***
      try ***REMOVED***

        ConsolidadosNacionalesBLL objNegocioConsolidados = new ConsolidadosNacionalesBLL(_connection);
        return objNegocioConsolidados.ObtenerNombreEntidad(codEntidad);
  ***REMOVED***
      catch (Exception) ***REMOVED***
        return string.Empty;
  ***REMOVED***
***REMOVED***

    public ModelGraficaSankey GetGraficaSankey(string codEntidad)
    ***REMOVED***
      ConsolidadosNacionalesBLL objNegocioConsolidados = new ConsolidadosNacionalesBLL(_connection);
      return objNegocioConsolidados.GetGraficaSankey(codEntidad);
***REMOVED***

    public ConsolidadoProgramasEntidad GetConsolidadoProgramasXCodEntidadAnio(string anioEntidad, string codEntidad)
    ***REMOVED***
      int.TryParse(anioEntidad, out int anio);
      ConsolidadosNacionalesBLL objNegocioConsolidados = new ConsolidadosNacionalesBLL(_connection);
      return objNegocioConsolidados.GetConsolidadoProgramasXCodEntidadAnio(anio,codEntidad);
***REMOVED***


  ***REMOVED***
***REMOVED***
