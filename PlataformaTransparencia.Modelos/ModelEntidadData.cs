using System;
using System.Collections.Generic;
using System.Text;
using PlataformaTransparencia.Modelos.Entidad;
using PlataformaTransparencia.Modelos.Plan;

namespace PlataformaTransparencia.Modelos
***REMOVED***
  public class ModelEntidadData : RespuestaContratoBase
  ***REMOVED***
    public string Mision ***REMOVED*** get; set; ***REMOVED***
    public string Vision ***REMOVED*** get; set; ***REMOVED***
    public string NombreEntidad ***REMOVED*** get; set; ***REMOVED***
    public string CodigoEntidad ***REMOVED*** get; set; ***REMOVED***

    public List<RelacionEmisiorReceptor> RelacionEntidadObjetivos ***REMOVED*** get; set; ***REMOVED***

   public List<InfoEntidad> Entidades ***REMOVED*** get; set; ***REMOVED***
    public List<ProyectosPerfilEntidad> ProyectosHaciendaCentral ***REMOVED*** get; set; ***REMOVED***
    public List<ProyectosPerfilEntidad> ProyectosHaciendaNoAsignable ***REMOVED*** get; set; ***REMOVED***
    public List<ProyectosProgramas> ProyectosHaciendaSustantivo ***REMOVED*** get; set; ***REMOVED***
  ***REMOVED***

  public class ProyectosPerfilEntidad
  ***REMOVED***
    public string NombreProyectoActividad ***REMOVED*** get; set; ***REMOVED***
    public string Descripcion ***REMOVED*** get; set; ***REMOVED***
    public string Clasificacion ***REMOVED*** get; set; ***REMOVED***
    public decimal PresupuestoVigente ***REMOVED*** get; set; ***REMOVED***
    public decimal PresupuestoAvance ***REMOVED*** get; set; ***REMOVED***

    public List<IndicadorProyecto> Indicadores ***REMOVED*** get; set; ***REMOVED***
  ***REMOVED***

  public class IndicadorProyecto
  ***REMOVED***
    public int Codigo ***REMOVED*** get; set; ***REMOVED***
    public string Nombre ***REMOVED*** get; set; ***REMOVED***
    public string Descripcion ***REMOVED*** get; set; ***REMOVED***
    public string UnidadMedidaAnioBase ***REMOVED*** get; set; ***REMOVED***
    public string UnidadMedidaTotal ***REMOVED*** get; set; ***REMOVED***
    public string UnidadIndicador ***REMOVED*** get; set; ***REMOVED***
    public decimal Avance ***REMOVED*** get; set; ***REMOVED***
    public string Frecuencia ***REMOVED*** get; set; ***REMOVED***
    public string Fuente ***REMOVED*** get; set; ***REMOVED***
    public string Formula ***REMOVED*** get; set; ***REMOVED***

    public string ind_frecuen ***REMOVED*** get; set; ***REMOVED***

    public string tipoIndicador ***REMOVED*** get; set; ***REMOVED***

    public string nivel ***REMOVED*** get; set; ***REMOVED***

    public string DescripcionPoblTotal ***REMOVED*** get; set; ***REMOVED***

    public decimal? indAnioBase ***REMOVED*** get; set; ***REMOVED***

***REMOVED***

  public class TableIndicadorGraphics
  ***REMOVED***
    public int anio ***REMOVED*** get; set; ***REMOVED***

    public string meta_numerador ***REMOVED*** get; set; ***REMOVED***

    public decimal? denominador ***REMOVED*** get; set; ***REMOVED***

    public decimal? avance_numerador ***REMOVED*** get; set; ***REMOVED***

    public double? porc_meta ***REMOVED*** get; set; ***REMOVED***

    public double? porc_avance ***REMOVED*** get; set; ***REMOVED***


  ***REMOVED***

  public class ProyectosProgramas
  ***REMOVED***
    public string NombrePrograma ***REMOVED*** get; set; ***REMOVED***
    public string ResultadoInmediato ***REMOVED*** get; set; ***REMOVED***
    public string ResultadoIntermedio ***REMOVED*** get; set; ***REMOVED***
    public string Problematica ***REMOVED*** get; set; ***REMOVED***
    public decimal PresupuestoAsignado ***REMOVED*** get; set; ***REMOVED***
    public List<ProyectosPerfilEntidad> Proyectos ***REMOVED*** get; set; ***REMOVED***
  ***REMOVED***

  public class ConsolidadoProgramasEntidad
  ***REMOVED***
    public int TotalActividadesProgramaCentral ***REMOVED*** get; set; ***REMOVED***
    public int TotalProgramasSustantivos ***REMOVED*** get; set; ***REMOVED***
    public int TotalActividadesProgramasNoAsignables ***REMOVED*** get; set; ***REMOVED***
  ***REMOVED***
***REMOVED***
