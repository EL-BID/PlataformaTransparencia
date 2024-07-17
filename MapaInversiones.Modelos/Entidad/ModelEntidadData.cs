﻿using System;
using System.Collections.Generic;
using System.Text;
using PlataformaTransparencia.Modelos.Contratos;
using PlataformaTransparencia.Modelos.Plan;

namespace PlataformaTransparencia.Modelos.Entidad
{
    public class ModelEntidadData : RespuestaContratoBase
    {
        public string Mision { get; set; ***REMOVED***
        public string Vision { get; set; ***REMOVED***
        public string NombreEntidad { get; set; ***REMOVED***
        public string CodigoEntidad { get; set; ***REMOVED***

        public List<string> Annios = new List<string>();
        public string UrlParticipacionCiudadana { get; set; ***REMOVED***

        public List<RelacionEmisiorReceptor> RelacionEntidadObjetivos { get; set; ***REMOVED***

        public List<InfoEntidad> Entidades { get; set; ***REMOVED***
        public List<ProyectosPerfilEntidad> ProyectosHaciendaCentral { get; set; ***REMOVED***
        public List<ProyectosPerfilEntidad> ProyectosHaciendaNoAsignable { get; set; ***REMOVED***
        public List<ProyectosProgramas> ProyectosHaciendaSustantivo { get; set; ***REMOVED***

        public List<infograficoPrograma> infoProgramas { get; set; ***REMOVED***

        public List<infograficoActividad> infograficoActividad { get; set; ***REMOVED***

        public List<infograficoGrupoGasto> infograficoGasto { get; set; ***REMOVED***

        public infograficoEntidad infograficoEntidad { get; set; ***REMOVED***

        public decimal PresupuestoVigenteAnnioDisplay { get; set; ***REMOVED***
        public decimal PresupuestoEjecutadoAnnioDisplay { get; set; ***REMOVED***
        public decimal PorcEjecutadoAnnioDisplay { get; set; ***REMOVED***

        public itemGenInversion detalleTipo { get; set; ***REMOVED***
***REMOVED***

    public class ProyectosPerfilEntidad
    {
        public string NombreProyectoActividad { get; set; ***REMOVED***
        public string Descripcion { get; set; ***REMOVED***
        public string Clasificacion { get; set; ***REMOVED***
        public decimal PresupuestoVigente { get; set; ***REMOVED***
        public decimal PresupuestoAvance { get; set; ***REMOVED***

        public List<IndicadorProyecto> Indicadores { get; set; ***REMOVED***
***REMOVED***

    public class IndicadorProyecto
    {
        public int Codigo { get; set; ***REMOVED***
        public string Nombre { get; set; ***REMOVED***
        public string Descripcion { get; set; ***REMOVED***
        public string UnidadMedidaAnioBase { get; set; ***REMOVED***
        public string UnidadMedidaTotal { get; set; ***REMOVED***
        public string UnidadIndicador { get; set; ***REMOVED***
        public decimal Avance { get; set; ***REMOVED***
        public string Frecuencia { get; set; ***REMOVED***
        public string Fuente { get; set; ***REMOVED***
        public string Formula { get; set; ***REMOVED***

        public string ind_frecuen { get; set; ***REMOVED***

        public string tipoIndicador { get; set; ***REMOVED***

        public string nivel { get; set; ***REMOVED***

        public string DescripcionPoblTotal { get; set; ***REMOVED***

        public decimal? indAnioBase { get; set; ***REMOVED***

***REMOVED***

    public class TableIndicadorGraphics
    {
        public int anio { get; set; ***REMOVED***

        public string meta_numerador { get; set; ***REMOVED***

        public decimal? denominador { get; set; ***REMOVED***

        public decimal? avance_numerador { get; set; ***REMOVED***

        public double? porc_meta { get; set; ***REMOVED***

        public double? porc_avance { get; set; ***REMOVED***


***REMOVED***

    public class ProyectosProgramas
    {
        public string NombrePrograma { get; set; ***REMOVED***
        public string ResultadoInmediato { get; set; ***REMOVED***
        public string ResultadoIntermedio { get; set; ***REMOVED***
        public string Problematica { get; set; ***REMOVED***
        public decimal PresupuestoAsignado { get; set; ***REMOVED***
        public List<ProyectosPerfilEntidad> Proyectos { get; set; ***REMOVED***
***REMOVED***

    public class ConsolidadoProgramasEntidad
    {
        public int TotalActividadesProgramaCentral { get; set; ***REMOVED***
        public int TotalProgramasSustantivos { get; set; ***REMOVED***
        public int TotalActividadesProgramasNoAsignables { get; set; ***REMOVED***


***REMOVED***

    public class DatosEntidadAnio
    {
        public decimal? PresupuestoInicial { get; set; ***REMOVED***
        public decimal? PresupuestoVigente { get; set; ***REMOVED***
        public decimal? PresupuestoEjecutado { get; set; ***REMOVED***
        public int FirmadosOncae { get; set; ***REMOVED***
        public decimal? ValorOncae { get; set; ***REMOVED***
        public int FirmadosSefin { get; set; ***REMOVED***
        public decimal? ValorSefin { get; set; ***REMOVED***
        public List<ContratistaData> DataContratos { get; set; ***REMOVED***
***REMOVED***


***REMOVED***