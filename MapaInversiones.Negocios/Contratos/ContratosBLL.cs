﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LinqToDB;
using PlataformaTransparencia.Infrastructura.DataModels;
using PlataformaTransparencia.Modelos;
using PlataformaTransparencia.Modelos.Contratos;

namespace PlataformaTransparencia.Negocios.Contratos
{
   public class ContratosBLL
    {
        private readonly TransparenciaDB _connection;

        public ContratosBLL(TransparenciaDB connection)
        {
            _connection = connection;
            _connection.CommandTimeout = 180;
    ***REMOVED***


        public ModelContratosAnios ObtenerAnniosContratos(string Moneda,string NombreProcesoo)
        {
            ModelContratosAnios _objreturn = new ModelContratosAnios();
            String Monedac = null;
            String NombreProceso = null;
            if (NombreProcesoo != null && NombreProcesoo.Trim() != "") { NombreProceso = NombreProcesoo; ***REMOVED***
            if (Moneda != null && Moneda.Trim() != "") { Monedac = Moneda; ***REMOVED***
            _objreturn.Detalles = (from cont in _connection.VwContratosDetalles
                                    where (cont.MonedaContrato.Contains(Moneda) || Moneda == null)
                                     && (cont.CodigoProceso.TrimStart().Contains(NombreProceso) || cont.DescripcionProceso.Contains(NombreProceso) || NombreProceso == null)
                                   group cont by cont.AnioUltimaActualizacion into g
                                    orderby g.Key.Value descending
                                    select new AnioContrato
                                    {
                                    valor= g.Key.Value
                                ***REMOVED***).Distinct().ToList();
        
            return _objreturn;
    ***REMOVED***

        public ModelContratosAnios ObtenerAnniosContratistas(string Contratista)
        {
            ModelContratosAnios _objreturn = new ModelContratosAnios();

            _objreturn.Detalles = (from cont in _connection.VwContratosDetalles
                                   where (cont.CodigoProveedor.Contains(Contratista) || Contratista == null) && cont.ValorContratado != null
                                   group cont by cont.AnioUltimaActualizacion into g
                                   orderby g.Key.Value descending
                                   select new AnioContrato
                                   {
                                       valor = g.Key.Value
                               ***REMOVED***).Distinct().ToList();

            return _objreturn;
    ***REMOVED***

        public ModelContratosData ObtenerInformacionContratosPorFiltros(ContratosFiltros filtros)
        {
            ModelContratosData _objreturn = new ModelContratosData();
            String NombreProceso = null;
            String NombreEntidad = null;
            String CodigoProveedor = null;
            String Estado = null;
            String Moneda = null;
            String OrigenInformacion = null;
            String CodigoComprador = null;
            int? Annio = null;

            if (filtros.NombreProceso != null && filtros.NombreProceso.Trim() != "") { NombreProceso = filtros.NombreProceso; ***REMOVED***
            if (filtros.NombreEntidad != null && filtros.NombreEntidad.Trim() != "") { NombreEntidad = filtros.NombreEntidad; ***REMOVED***
            if (filtros.CodigoProveedor != null && filtros.CodigoProveedor.Trim() != "") { CodigoProveedor = filtros.CodigoProveedor; ***REMOVED***
            if (filtros.CodigoComprador != null && filtros.CodigoComprador.Trim() != "") { CodigoComprador = filtros.CodigoComprador; ***REMOVED***
            if (filtros.Estado != null && filtros.Estado.Trim() != "") { Estado = filtros.Estado; ***REMOVED***
            if (filtros.Moneda != null && filtros.Moneda.Trim() != "") { Moneda = filtros.Moneda; ***REMOVED***
            if (filtros.OrigenInformacion != null && filtros.OrigenInformacion.Trim() != "") { OrigenInformacion = filtros.OrigenInformacion; ***REMOVED***
            if (filtros.Annio > 0) { Annio = filtros.Annio; ***REMOVED***

            try
            {
                _objreturn.CantidadTotalRegistros = (from cont in _connection.VwContratosDetalles
                                                     where (cont.AnioUltimaActualizacion == Annio || Annio == null)
                                                       && (cont.MonedaContrato.Contains(Moneda) || Moneda == null)
                                                       && (cont.Comprador.Contains(NombreEntidad) || NombreEntidad == null)
                                                       && (cont.EstadoProceso.Contains(Estado) || Estado == null)
                                                       && (cont.DescripcionProceso.Contains(NombreProceso)
                                                        || cont.CodigoProceso.TrimStart() == NombreProceso || NombreProceso == null)
                                                       && (cont.CodigoProveedor == CodigoProveedor || CodigoProveedor == null)
                                                       && (cont.CodigoComprador == CodigoComprador || CodigoComprador == null)
                                                       && (cont.OrigenInformacion.ToUpper().Contains(OrigenInformacion) || OrigenInformacion == null)
                                                       && cont.ValorContratado != null
                                                     let NUMBER = Sql.Ext.DenseRank().Over().OrderBy(cont.Comprador).ThenBy(cont.CodigoProceso).ThenBy(cont.OrigenInformacion).ToValue()
                                                     orderby NUMBER descending
                                                     select NUMBER
                               ).First();
        ***REMOVED***
            catch {
                _objreturn.CantidadTotalRegistros = 0;
        ***REMOVED***

            _objreturn.Data = (from cont in _connection.VwContratosDetalles
                        where
                        (cont.AnioUltimaActualizacion == Annio || Annio == null)
                        && (cont.MonedaContrato.Contains(Moneda) || Moneda == null)
                        && (cont.Comprador.Contains(NombreEntidad) || NombreEntidad == null)
                        && (cont.EstadoProceso.Contains(Estado) || Estado == null)
                        && (cont.DescripcionProceso.Contains(NombreProceso)
                        || cont.CodigoProceso.TrimStart() == NombreProceso || NombreProceso == null)
                        && (cont.CodigoProveedor == CodigoProveedor || CodigoProveedor == null)
                        && (cont.CodigoComprador == CodigoComprador || CodigoComprador == null)
                        && (cont.OrigenInformacion.ToUpper().Contains(OrigenInformacion) || OrigenInformacion == null)
                        && cont.ValorContratado != null
                        let NUMBER = Sql.Ext.DenseRank().Over().OrderBy(cont.Comprador).ThenBy(cont.CodigoProceso).ThenBy(cont.OrigenInformacion).ToValue()
                        where
                        NUMBER > ((filtros.NumeroPagina - 1) * filtros.RegistrosPorPagina)
                        && NUMBER <= (filtros.NumeroPagina * filtros.RegistrosPorPagina)
                        select new ContratosData
                        {
                            AnioUltimaActualizacion = cont.AnioUltimaActualizacion,
                            DescripcionProceso = cont.DescripcionProceso,
                            EstadoProceso = cont.EstadoProceso,
                            CodigoContrato = cont.CodigoContrato,
                            CodigoProceso = cont.CodigoProceso,
                            CodigoProveedor = cont.CodigoProveedor,
                            Contratista = cont.Contratista,
                            ValorPlaneado = cont.ValorPlaneado,
                            ValorAdjudicado = cont.ValorAdjudicado,
                            ValorContratado = cont.ValorContratado,
                            MonedaContrato = cont.MonedaContrato,
                            UrlContrato = cont.UrlContrato,
                            CodigoComprador = cont.CodigoComprador,
                            Comprador = cont.Comprador,
                            EntidadOrigenFondos = cont.EntidadOrigenFondos,
                            OrigenFondos = cont.OrigenFondos,
                            DocURL = cont.DocURL,
                            OrigenInformacion = cont.OrigenInformacion

                    ***REMOVED***
                             ).ToList();

            return _objreturn;
    ***REMOVED***


        public ModelContratosData ObtenerInformacionContratistaPorFiltros(ContratosFiltros filtros)
        {
            ModelContratosData _objreturn = new ModelContratosData();
            String NombreProceso = null;
            String NombreEntidad = null;
            String CodigoProveedor = null;
            String Estado = null;
            String Moneda = null;
            String OrigenInformacion = null;
            int? Annio = null;

            if (filtros.NombreProceso != null && filtros.NombreProceso.Trim() != "") { NombreProceso = filtros.NombreProceso; ***REMOVED***
            if (filtros.NombreEntidad != null && filtros.NombreEntidad.Trim() != "") { NombreEntidad = filtros.NombreEntidad; ***REMOVED***
            if (filtros.CodigoProveedor != null && filtros.CodigoProveedor.Trim() != "") { CodigoProveedor = filtros.CodigoProveedor; ***REMOVED***
            if (filtros.Estado != null && filtros.Estado.Trim() != "") { Estado = filtros.Estado; ***REMOVED***
            if (filtros.Moneda != null && filtros.Moneda.Trim() != "") { Moneda = filtros.Moneda; ***REMOVED***
            if (filtros.OrigenInformacion != null && filtros.OrigenInformacion.Trim() != "") { OrigenInformacion = filtros.OrigenInformacion; ***REMOVED***
            if (filtros.Annio > 0) { Annio = filtros.Annio; ***REMOVED***

            try
            {
                _objreturn.CantidadTotalRegistros = (from cont in _connection.VwContratosDetalles
                                                     where (cont.AnioUltimaActualizacion == Annio || Annio == null)
                                                       && (cont.MonedaContrato.Contains(Moneda) || Moneda == null)
                                                       && (cont.Comprador.Contains(NombreEntidad) || NombreEntidad == null)
                                                       && (cont.EstadoProceso.Contains(Estado) || Estado == null)
                                                       && (cont.CodigoProceso.TrimStart().Contains(NombreProceso) || cont.DescripcionProceso.Contains(NombreProceso) || NombreProceso == null)
                                                       && (cont.CodigoProveedor == CodigoProveedor || CodigoProveedor == null)
                                                       && (cont.OrigenInformacion.Contains(OrigenInformacion) || OrigenInformacion == null)
                                                       && cont.ValorContratado != null
                                                     let NUMBER = Sql.Ext.DenseRank().Over().OrderBy(cont.Comprador).ThenBy(cont.CodigoProceso).ThenBy(cont.OrigenInformacion).ToValue()
                                                     orderby NUMBER descending
                                                     select NUMBER
                                       ).First();
        ***REMOVED***
            catch {

                _objreturn.CantidadTotalRegistros = 0;
        ***REMOVED***

            //var consulta = (from cont in _connection.VwContratosDetalles
            //                where
            //                (cont.AnioUltimaActualizacion == Annio || Annio == null)
            //                && (cont.MonedaContrato.Contains(Moneda) || Moneda == null)
            //                && (cont.Comprador.Contains(NombreEntidad) || NombreEntidad == null)
            //                && (cont.EstadoProceso.Contains(Estado) || Estado == null)
            //                && (cont.CodigoProceso.TrimStart().Contains(NombreProceso) || cont.DescripcionProceso.Contains(NombreProceso) || NombreProceso == null)
            //                && (cont.CodigoProveedor.Contains(CodigoProveedor) || CodigoProveedor == null)
            //                && (cont.OrigenInformacion.Contains(OrigenInformacion) || OrigenInformacion == null)
            //                && cont.ValorContratado != null
            //                let NUMBER = Sql.Ext.DenseRank().Over().OrderBy(cont.Comprador).ThenBy(cont.CodigoProceso).ThenBy(cont.OrigenInformacion).ToValue()
            //                where
            //                NUMBER > ((filtros.NumeroPagina - 1) * filtros.RegistrosPorPagina - 1)
            //                && NUMBER <= (filtros.NumeroPagina * filtros.RegistrosPorPagina)
            //                select new ContratosData
            //                {
            //                    AnioUltimaActualizacion = cont.AnioUltimaActualizacion,
            //                    DescripcionProceso = cont.DescripcionProceso,
            //                    EstadoProceso = cont.EstadoProceso,
            //                    CodigoContrato = cont.CodigoContrato,
            //                    CodigoProceso = cont.CodigoProceso,
            //                    CodigoProveedor = cont.CodigoProveedor,
            //                    Contratista = cont.Contratista,
            //                    ValorPlaneado = cont.ValorPlaneado,
            //                    ValorAdjudicado = cont.ValorAdjudicado,
            //                    ValorContratado = cont.ValorContratado,
            //                    MonedaContrato = cont.MonedaContrato,
            //                    UrlContrato = cont.UrlContrato,
            //                    CodigoComprador = cont.CodigoComprador,
            //                    Comprador = cont.Comprador,
            //                    EntidadOrigenFondos = cont.EntidadOrigenFondos,
            //                    OrigenFondos = cont.OrigenFondos,
            //                    DocURL = cont.DocURL,
            //                    OrigenInformacion = cont.OrigenInformacion

            //            ***REMOVED***
            //                 );


            //var consulta =  (from cont in _connection.VwContratosDetalles
            //                                  where
            //                                  (cont.AnioUltimaActualizacion == Annio || Annio == null)
            //                                  && (cont.MonedaContrato.Contains(Moneda) || Moneda == null)
            //                                  && (cont.Comprador.Contains(NombreEntidad) || NombreEntidad == null)
            //                                  && (cont.EstadoProceso.Contains(Estado) || Estado == null)
            //                                  && (cont.CodigoProceso.TrimStart().Contains(NombreProceso) || cont.DescripcionProceso.Contains(NombreProceso) || NombreProceso == null)
            //                                  && (cont.CodigoProveedor == CodigoProveedor || CodigoProveedor == null)
            //                                  && (cont.OrigenInformacion.Contains(OrigenInformacion) || OrigenInformacion == null)
            //                                  && cont.ValorContratado != null
            //                                  let NUMBER = Sql.Ext.DenseRank().Over().OrderBy(cont.Comprador).ThenBy(cont.CodigoProceso).ThenBy(cont.OrigenInformacion).ToValue()
            //                                  where
            //                                  NUMBER > ((filtros.NumeroPagina - 1) * filtros.RegistrosPorPagina)
            //                                  && NUMBER <= (filtros.NumeroPagina * filtros.RegistrosPorPagina)
            //                                  select new ContratosData
            //                                  {
            //                                      AnioUltimaActualizacion = cont.AnioUltimaActualizacion,
            //                                      DescripcionProceso = cont.DescripcionProceso,
            //                                      EstadoProceso = cont.EstadoProceso,
            //                                      CodigoContrato = cont.CodigoContrato,
            //                                      CodigoProceso = cont.CodigoProceso,
            //                                      CodigoProveedor = cont.CodigoProveedor,
            //                                      Contratista = cont.Contratista,
            //                                      ValorPlaneado = cont.ValorPlaneado,
            //                                      ValorAdjudicado = cont.ValorAdjudicado,
            //                                      ValorContratado = cont.ValorContratado,
            //                                      MonedaContrato = cont.MonedaContrato,
            //                                      UrlContrato = cont.UrlContrato,
            //                                      CodigoComprador = cont.CodigoComprador,
            //                                      Comprador = cont.Comprador,
            //                                      EntidadOrigenFondos = cont.EntidadOrigenFondos,
            //                                      OrigenFondos = cont.OrigenFondos,
            //                                      DocURL = cont.DocURL,
            //                                      OrigenInformacion = cont.OrigenInformacion

            //                              ***REMOVED***
            //                 );

            _objreturn.Data = (from cont in _connection.VwContratosDetalles
                               where
                               (cont.AnioUltimaActualizacion == Annio || Annio == null)
                               && (cont.MonedaContrato.Contains(Moneda) || Moneda == null)
                               && (cont.Comprador.Contains(NombreEntidad) || NombreEntidad == null)
                               && (cont.EstadoProceso.Contains(Estado) || Estado == null)
                               && (cont.CodigoProceso.TrimStart().Contains(NombreProceso) || cont.DescripcionProceso.Contains(NombreProceso) || NombreProceso == null)
                               && (cont.CodigoProveedor == CodigoProveedor || CodigoProveedor == null)
                               && (cont.OrigenInformacion.Contains(OrigenInformacion) || OrigenInformacion == null)
                               && cont.ValorContratado != null
                               let NUMBER = Sql.Ext.DenseRank().Over().OrderBy(cont.Comprador).ThenBy(cont.CodigoProceso).ThenBy(cont.OrigenInformacion).ToValue()
                               where
                               NUMBER > ((filtros.NumeroPagina - 1) * filtros.RegistrosPorPagina)
                               && NUMBER <= (filtros.NumeroPagina * filtros.RegistrosPorPagina)
                               select new ContratosData
                               {
                                   AnioUltimaActualizacion = cont.AnioUltimaActualizacion,
                                   DescripcionProceso = cont.DescripcionProceso,
                                   EstadoProceso = cont.EstadoProceso,
                                   CodigoContrato = cont.CodigoContrato,
                                   CodigoProceso = cont.CodigoProceso,
                                   CodigoProveedor = cont.CodigoProveedor,
                                   Contratista = cont.Contratista,
                                   ValorPlaneado = cont.ValorPlaneado,
                                   ValorAdjudicado = cont.ValorAdjudicado,
                                   ValorContratado = cont.ValorContratado,
                                   MonedaContrato = cont.MonedaContrato,
                                   UrlContrato = cont.UrlContrato,
                                   CodigoComprador = cont.CodigoComprador,
                                   Comprador = cont.Comprador,
                                   EntidadOrigenFondos = cont.EntidadOrigenFondos,
                                   OrigenFondos = cont.OrigenFondos,
                                   DocURL = cont.DocURL,
                                   OrigenInformacion=cont.OrigenInformacion

                           ***REMOVED***
                             ).ToList();
            return _objreturn;
    ***REMOVED***

        public  List<InfoContratosPerAnyo> ObtenerContratosPerAnyo(string Contratista)
        {
            List<InfoContratosPerAnyo> _objreturn = new List<InfoContratosPerAnyo>();

            _objreturn = (from cont in _connection.VwContratosPerfilContratistaXAnios
                          where (cont.CodigoProveedor.Contains(Contratista) || Contratista == null) && cont.ValorContratado != null
                                   select new InfoContratosPerAnyo
                                   {
                                       labelGroup = cont.OrigenInformacion.ToUpper(),
                                       label = cont.Anio.ToString(),
                                       rawValue = (decimal)(cont.NroContratos * 1),
                                       value = cont.NroContratos.ToString()//,
                                      // label_inf = 
                               ***REMOVED***).OrderBy(x => x.label).ToList();

            return _objreturn;

    ***REMOVED***

        public List<InfoContratosPerAnyo> ObtenerValorContratosPerAnyo(string Contratista)
        {
            List<InfoContratosPerAnyo> _objreturn = new List<InfoContratosPerAnyo>();

            _objreturn = (from cont in _connection.VwContratosPerfilContratistaXAnios
                          where (cont.CodigoProveedor.Contains(Contratista) || Contratista == null) && cont.ValorContratado != null
                          select new InfoContratosPerAnyo
                          {
                              labelGroup = cont.OrigenInformacion.ToUpper(),
                              label = cont.Anio.ToString(),
                              rawValue = (decimal)cont.ValorContratado,
                              value = cont.ValorContratado.ToString()
                      ***REMOVED***).OrderBy(x => x.label).ToList();

            return _objreturn;

    ***REMOVED***

        public List<InfoContratosPerAnyo> ObtenerComprador(string Comprador)
        {
            List<InfoContratosPerAnyo> _objreturn = new List<InfoContratosPerAnyo>();

            _objreturn = (from cont in _connection.VwContratosDetalles
                          where (cont.Comprador.Contains(Comprador))
                          group cont by cont.Comprador into g
                          select new InfoContratosPerAnyo
                          {
                              label = g.Key
                      ***REMOVED***).Distinct().ToList();

            return _objreturn;

    ***REMOVED***


        public List<ContratosConsolidado> ObtenerConsolidado(int annio, string moneda=null)
        {
            List<ContratosConsolidado> _objreturn = new List<ContratosConsolidado>();

            _objreturn = (from contr in _connection.VwContratosConsolidados
                                   where (contr.MonedaContrato == moneda.ToString() || moneda == null)
                                   && contr.ValorContratado != null
                                   && contr.Anio == annio
                                   orderby contr.Anio descending
                                    group contr by new { contr.MonedaContrato, contr.OrigenInformacion***REMOVED*** into datos
                          select new ContratosConsolidado
                                   {
                                       OrigenInformacion = datos.Key.OrigenInformacion,
                                       MonedaContrato = datos.Key.MonedaContrato,
                                       ValorContratado = datos.Sum(x => x.ValorContratado),
                                       NroContratos = datos.Sum(x => x.NroContratos),
                               ***REMOVED***).Distinct().ToList();

            //var aglo = (from contr in _connection.VwContratosConsolidados
            //            where (contr.MonedaContrato == moneda.ToString() || moneda == null)
            //            && contr.ValorContratado != null
            //            && contr.Anio == annio
            //            orderby contr.Anio descending
            //            select new ContratosConsolidado
            //            {
            //                OrigenInformacion = contr.OrigenInformacion,
            //                MonedaContrato = contr.MonedaContrato,
            //                ValorContratado = contr.ValorContratado,
            //                NroContratos = contr.NroContratos,
            //        ***REMOVED***).Distinct();
            return _objreturn;


    ***REMOVED***


***REMOVED***
***REMOVED***