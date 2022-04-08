﻿using System;
using System.Collections.Generic;
using System.Linq;
using PlataformaTransparencia.Infrastructura.DataModels;
using PlataformaTransparencia.Modelos.Plan;
using PlataformaTransparencia.Negocios.Interfaces;

namespace PlataformaTransparencia.Negocios.PlanNacional
***REMOVED***
  public class PlanNacionalBLL: IPlanNacionalBLL
  ***REMOVED***
    private readonly TransparenciaDB _connection;

    public PlanNacionalBLL(TransparenciaDB connection)
    ***REMOVED***
      _connection = connection;
***REMOVED***
   
    /// <summary>
    /// Datos para treemap presupuestado y vista plan Nacional
    /// </summary>
    /// <param name="idEjeEstrategico">Es el id del eje estratégico</param>
    /// <returns>Un listado con cada objetivo general y sus respectivos objetivos específicos</returns>
    public List<ObjetivosGeneralPorEjeEstrategico> ObtenerObjetivosPorEjeEstrategico(int idEjeEstrategico)
    ***REMOVED***
      List<ObjetivosGeneralPorEjeEstrategico> objReturn = new List<ObjetivosGeneralPorEjeEstrategico>();
      var objetivosQuery = (from info in _connection.VinculacionIndicadoresPNDXEntidadesStps0    //VinculacionIndicadoresPNDXEntidadesStp //VwObjetivosPNDStp
                            where info.CodObjetivoEstrategico.HasValue && info.CodEjeEstrategico.HasValue && info.CodEjeEstrategico.Value == idEjeEstrategico
                            select new ObjetivosGeneralPorEjeEstrategico ***REMOVED***
                              Id= info.CodObjetivoEstrategico.Value,
                              Nombre= info.NombreObjetivoEstrategico,
                              Descripcion=info.DescripcionObjetivoEstrategico,
                              Ods= new List<AlineacionOds>()
                        ***REMOVED***
                           ).Distinct().OrderBy(x=>x.Nombre).ToList();
      for (var j = 0; j < objetivosQuery.Count; j++) ***REMOVED***
        var alineacionOds = (from info in _connection.ConsultaVinculacionPNDPresupuestoXEntidadStp//   VinculacionIndicadoresPNDPresupuestoXEntidadesSTPV2 //VwObjetivosPNDStp
                             where info.CodODS.HasValue && info.CodObjetivoEstrategico.HasValue && info.CodEjeEstrategico.HasValue && info.CodEjeEstrategico.Value == idEjeEstrategico && info.CodObjetivoEstrategico == objetivosQuery[j].Id
                             select new AlineacionOds ***REMOVED***
                               CodOds = info.CodODS,
                               Nombre = info.NombreODS
                         ***REMOVED***
                           ).Distinct().OrderBy(x => x.CodOds.Value).ToList();
        objetivosQuery[j].Ods = alineacionOds;
  ***REMOVED***
      foreach (var objetivoQuery in objetivosQuery) ***REMOVED***
        var objetivosEspecificosQuery = (from info in _connection.VinculacionIndicadoresPNDXEntidadesStps0  //VinculacionIndicadoresPNDXEntidadesStp //VwObjetivosPNDStp
                                         where info.CodObjetivoEspecifico.HasValue && info.CodObjetivoEstrategico.HasValue &&  info.CodEjeEstrategico.HasValue &&   info.CodEjeEstrategico.Value == idEjeEstrategico && info.CodObjetivoEstrategico.Value == objetivoQuery.Id
                                         select new Modelos.Plan.ObjetivoEspecifico ***REMOVED***
                                           Id = info.CodObjetivoEspecifico.Value,
                                           Nombre=  info.NombreObjetivoEspecifico.Trim().Replace(info.CodEjeEstrategico.Value + "." + info.CodObjetivoEstrategico.Value + "." + info.CodObjetivoEspecifico.Value + ".", string.Empty).Trim().Replace(info.CodEjeEstrategico.Value + "." + info.CodObjetivoEstrategico.Value + "." + info.CodObjetivoEspecifico.Value, string.Empty).Trim(),
                                           Codigo= info.CodEjeEstrategico.Value + "." + info.CodObjetivoEstrategico.Value + "." + info.CodObjetivoEspecifico.Value
                                     ***REMOVED***
                                        ).Distinct().OrderBy(x => x.Id).ToList();

        objetivoQuery.ObjetivoEspecifico = objetivosEspecificosQuery;
  ***REMOVED***
      objReturn = new List<ObjetivosGeneralPorEjeEstrategico>(objetivosQuery);
      return objReturn;
***REMOVED***

    /// <summary>
    /// Entidades que hacen parte del plan nacional de desarrollo
    /// </summary>
    /// <returns>Un listado con las entidades relacionadas con el plan Nacional de desarrollo</returns>
    public List<InfoEntidad> ObtenerEntidadesPlanNacional()
    ***REMOVED***
      List<InfoEntidad> objReturn = new List<InfoEntidad>();
      var entidadesPlanNacional = (from info in _connection.CatalogoEntidades
                                   select new InfoEntidad ***REMOVED***
                                     CodEntidad = info.CodNivelEntidad,
                                     Nombre = info.NombreEntidad,
                               ***REMOVED***
                                   ).Distinct().OrderBy(x => x.Nombre).ToList();
      objReturn = new List<InfoEntidad>(entidadesPlanNacional.Count>6 ?  entidadesPlanNacional.OrderBy(x=>x.Nombre).Take(6) : entidadesPlanNacional.OrderBy(x => x.Nombre));
      return objReturn;
***REMOVED***

    /// <summary>
    /// Datos para treemap presupuestado y vista plan Nacional
    /// </summary>
    /// <param name="idObjetivoEspecifico">Es el id del eje estratégico</param>
    /// <returns>Un listado con cada objetivo general y sus respectivos objetivos específicos</returns>
    public List<IndicadorObjetivoEspecifico> ObtenerIndicadoresXIdObjetivoEspecifico(int idEje, int idObjetivoEstrategico, int idObjetivoEspecifico)
    ***REMOVED***
      List<IndicadorObjetivoEspecifico> objReturn = new List<IndicadorObjetivoEspecifico>();
      var indicadoresQuery = (from info in _connection.VinculacionIndicadoresPNDXEntidadesStps0
                            where info.CodEjeEstrategico.HasValue && info.CodObjetivoEstrategico.HasValue && info.CodObjetivoEspecifico.HasValue &&  info.CodEjeEstrategico.Value == idEje && info.CodObjetivoEstrategico.Value== idObjetivoEstrategico && info.CodObjetivoEspecifico== idObjetivoEspecifico
                            select new IndicadorObjetivoEspecifico ***REMOVED***
                              IdIndicador = ((int)info.IdIndicador),
                              Nombre = info.Indicador,//.Replace("/1.",string.Empty)
                              UnidadEscala = info.UnidadEscala,
                              AnioBase=  info.AñoBaseIndicador.HasValue? info.AñoBaseIndicador.Value.ToString() : string.Empty, //Math.Round(info.AñoBaseIndicador.Value,0).ToString()
                              ValorAnioBase = info.ValorInidicador,//info.ValorInidicador.HasValue? Math.Round(info.ValorInidicador.Value,0): info.ValorInidicador,
                              Meta2023 = info.Meta2023.HasValue? Math.Round(info.Meta2023.Value, 2):  info.Meta2023,
                              Meta2030= info.Meta2030.HasValue ? Math.Round(info.Meta2030.Value, 2) : info.Meta2030,
                              Avance= info.Avance.HasValue? Math.Round(info.Avance.Value,2): info.Avance
                        ***REMOVED***
                           ).Distinct().OrderBy(x => x.IdIndicador).ToList();
      objReturn = new List<IndicadorObjetivoEspecifico>(indicadoresQuery);
      return objReturn;
***REMOVED***
  ***REMOVED***
***REMOVED***
