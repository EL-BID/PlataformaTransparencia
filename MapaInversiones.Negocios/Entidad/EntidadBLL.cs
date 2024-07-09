﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;
using DataModels;
using LinqToDB;
using PlataformaTransparencia.Infrastructura.DataModels;
using PlataformaTransparencia.Modelos;
using PlataformaTransparencia.Modelos.Contratos;
using PlataformaTransparencia.Modelos.Entidad;
using PlataformaTransparencia.Modelos.Plan;
using PlataformaTransparencia.Negocios;
using PlataformaTransparencia.Negocios.BLL.Contracts;
using PlataformaTransparencia.Negocios.Home;
using SolrNet;
using SolrNet.Commands.Parameters;
using static Microsoft.AspNetCore.Hosting.Internal.HostingApplication;

namespace PlataformaTransparencia.Negocios.Entidad
{
    public class EntidadBLL : IEntidadBLL
    {
        private readonly TransparenciaDB _connection;

        public EntidadBLL(TransparenciaDB connection)
        {
            _connection = connection;
    ***REMOVED***

        private string ConvertirTextoMayusculaMinuscula(string texto)
        {
            if (texto == string.Empty || texto == "*") return string.Empty;
            texto = texto.ToLower();
            var primeraLetra = texto.Substring(0, 1);
            texto = texto.Remove(0, 1);
            texto = primeraLetra.ToUpper() + texto;
            return texto;
    ***REMOVED***

        public List<infograficoPrograma> GetProgramasByEntidad(int annio, string codEntidad) {
            List<infograficoPrograma> objReturn = new List<infograficoPrograma>();
            var RecursosPerObjetoQuery = (from a in _connection.VwPresupuesto
                                          where a.Periodo.ToString().StartsWith(annio.ToString()) && a.CodigoInstitucion == codEntidad
                                          group a by new { a.CodigoPrograma, a.Programa ***REMOVED*** into g
                                          select new infograficoPrograma
                                          {
                                              Id = g.Key.CodigoPrograma,
                                              Nombre = g.Key.Programa,
                                              presupuesto = g.Sum(x => x.Vigente.Value),
                                              aprobado = g.Sum(x => x.Aprobado.Value),
                                              ejecutado = g.Sum(x => x.EjecucionAcumulada.Value)
                                      ***REMOVED***).ToList();

            objReturn = RecursosPerObjetoQuery;

            return objReturn;


    ***REMOVED***

        public List<infograficoActividad> GetActividadByPrograma(int annio, string codEntidad, int codPrograma)
        {
            List<infograficoActividad> objReturn = new List<infograficoActividad>();

            var query1 = (from pre in _connection.VwPresupuesto
                          where (pre.Periodo == annio && Convert.ToInt32(pre.CodigoInstitucion) == Convert.ToInt32(codEntidad) && pre.CodigoPrograma == Convert.ToInt32(codPrograma).ToString())
                          group pre by new { pre.Periodo, pre.CodigoInstitucion, pre.CodigoPrograma, pre.CodigoSubPrograma, pre.CodigoActividadObra, pre.ActividadObra, pre.CodigoObjetoDeGasto ***REMOVED*** into g
                          select new
                          {
                              periodo = g.Key.Periodo,
                              codInstitucion = Convert.ToInt32(g.Key.CodigoInstitucion),
                              codPrograma = g.Key.CodigoPrograma,
                              codSubprograma = g.Key.CodigoSubPrograma,
                              codActividad = g.Key.CodigoActividadObra,
                              nomActividad = g.Key.ActividadObra,
                              codObjeto = g.Key.CodigoObjetoDeGasto,
                              asignado = (decimal)g.Sum(t => t.Vigente) / 1000000,
                      ***REMOVED***);


            var query2 = (from x in _connection.VWContratosXPresupuestoes
                          where (x.Periodo == annio && Convert.ToInt32(x.CodigoInstitucion) == Convert.ToInt32(codEntidad) && x.CodigoPrograma == codPrograma)
                          group x by new { x.Periodo, x.CodigoInstitucion, x.CodigoPrograma, x.CodigoSubPrograma, x.CodigoActividadObra, x.CodigoObjetoDeGasto, x.Ocid, x.IdBudget ***REMOVED*** into g
                          select new
                          {
                              periodo = g.Key.Periodo,
                              codInstitucion = Convert.ToInt32(g.Key.CodigoInstitucion),
                              codPrograma = g.Key.CodigoPrograma,
                              codSubprograma = g.Key.CodigoSubPrograma,
                              codActividad = g.Key.CodigoActividadObra,
                              codObjeto = g.Key.CodigoObjetoDeGasto,
                              ocid = g.Key.Ocid,
                              contrato = g.Key.IdBudget

                      ***REMOVED***);


            var query3 = (from presupuesto in query1
                          from contratos in query2.Where(j => j.periodo == presupuesto.periodo)
                             .Where(j => j.codInstitucion == presupuesto.codInstitucion)
                             .Where(j => j.codPrograma.Value.ToString() == presupuesto.codPrograma)
                             .Where(j => j.codActividad == int.Parse(presupuesto.codActividad))
                             .Where(j => j.codObjeto == int.Parse(presupuesto.codObjeto))
                          from detalle in _connection.VwContratosDetalles
                          .Where(j => j.CodigoProceso == contratos.ocid)
                          select new
                          {
                              codActividad = presupuesto.codActividad,
                              nomActividad = "act|" + presupuesto.nomActividad,
                              codProceso = contratos.ocid,
                              descProceso = "proc|" + detalle.DescripcionProceso,
                              estadoProceso = detalle.EstadoProceso,
                              codContrato = "contr|" + detalle.CodigoContrato,
                              AportePresupuesto = detalle.ValorAdjudicado

                      ***REMOVED***
                          ).Distinct().OrderBy(x => x.nomActividad).
                                    ThenBy(x => x.codProceso).
                                    ThenBy(x => x.codContrato).ToList();


            infograficoActividad objActividad = null;
            infograficoProcesos objProcesos = null;
            infograficoContratos objContratos = null;

            foreach (var fila in query3)
            {
                objActividad = objReturn.Find(p => p.Id == fila.codActividad.ToString());
                if (objActividad == null)
                {
                    objActividad = new infograficoActividad();
                    objActividad.Id = fila.codActividad.ToString();
                    objActividad.Nombre = fila.nomActividad;
                    objActividad.presupuesto = fila.AportePresupuesto;
                 

                    objProcesos = objActividad.Detalles.Find(p => p.Id == fila.codActividad.ToString());
                    if (objProcesos == null)
                    {
                        objProcesos = new infograficoProcesos();
                        objProcesos.Id = fila.codProceso.ToString();
                        objProcesos.Nombre = fila.descProceso;
                        objProcesos.presupuesto = fila.AportePresupuesto;
                        objProcesos.Estado = fila.estadoProceso;
                       

                        objContratos = objProcesos.Detalles.Find(p => p.Id == fila.codContrato.ToString());
                        if (objContratos == null)
                        {
                            objContratos = new infograficoContratos();
                            objContratos.Id = fila.codContrato.ToString();
                            objContratos.Nombre = fila.codContrato;
                            objContratos.presupuesto = fila.AportePresupuesto;
                         

                            objProcesos.Detalles.Add(objContratos);

                    ***REMOVED***
                        else
                        {
                            objContratos.presupuesto += fila.AportePresupuesto;
               

                    ***REMOVED***

                        objActividad.Detalles.Add(objProcesos);
                ***REMOVED***
                    else
                    {
                        objProcesos.presupuesto += fila.AportePresupuesto;
                        

                        objContratos = objProcesos.Detalles.Find(p => p.Id == fila.codContrato.ToString());
                        if (objContratos == null)
                        {
                            objContratos = new infograficoContratos();
                            objContratos.Id = fila.codContrato;
                            objContratos.Nombre = fila.codContrato;
                            objContratos.presupuesto = fila.AportePresupuesto;
                            

                            objProcesos.Detalles.Add(objContratos);

                    ***REMOVED***
                        else
                        {
                            objContratos.presupuesto += fila.AportePresupuesto;
                            
                    ***REMOVED***

                ***REMOVED***

                    objReturn.Add(objActividad);
            ***REMOVED***
                else
                {
                    objActividad.presupuesto += fila.AportePresupuesto;
                    objProcesos = objActividad.Detalles.Find(p => p.Id == fila.codProceso.ToString());
                    if (objProcesos == null)
                    {
                        objProcesos = new infograficoProcesos();
                        objProcesos.Id = fila.codProceso.ToString();
                        objProcesos.Nombre = fila.descProceso;
                        objProcesos.presupuesto = fila.AportePresupuesto;
                        objProcesos.Estado = fila.estadoProceso;
                        

                        objContratos = objProcesos.Detalles.Find(p => p.Id == fila.codContrato.ToString());
                        if (objContratos == null)
                        {
                            objContratos = new infograficoContratos();
                            objContratos.Id = fila.codContrato;
                            objContratos.Nombre = fila.codContrato;
                            objContratos.presupuesto = fila.AportePresupuesto;
                           

                            objProcesos.Detalles.Add(objContratos);

                    ***REMOVED***
                        else
                        {
                            objContratos.presupuesto += fila.AportePresupuesto;
                            

                    ***REMOVED***

                        objActividad.Detalles.Add(objProcesos);
                ***REMOVED***
                    else
                    {
                        objProcesos.presupuesto += fila.AportePresupuesto;
                        objContratos = objProcesos.Detalles.Find(p => p.Id == fila.codContrato);
                        if (objContratos == null)
                        {
                            objContratos = new infograficoContratos();
                            objContratos.Id = fila.codContrato.ToString();
                            objContratos.Nombre = fila.codContrato;
                            objContratos.presupuesto = fila.AportePresupuesto;
                          

                            objProcesos.Detalles.Add(objContratos);

                    ***REMOVED***
                        else
                        {
                            objContratos.presupuesto += fila.AportePresupuesto;
                         
                    ***REMOVED***

                ***REMOVED***


            ***REMOVED***
        ***REMOVED***

            ///ordena primer nivel actividad
            var result = objReturn.OrderByDescending(x => x.presupuesto).ToList();
            foreach (var item in result)
            {
                //ordena nivel proceso
                item.Detalles = item.Detalles.OrderByDescending(x => x.presupuesto).ToList();
                foreach (var item_actividad in item.Detalles)
                {
                    //ordena nivel cont
                    item_actividad.Detalles = item_actividad.Detalles.OrderByDescending(x => x.presupuesto).ToList();
            ***REMOVED***
        ***REMOVED***
            return result;



    ***REMOVED***


        public infograficoEntidad GetGastoByPrograma(int annio, int codEntidad, int codPrograma, string estado, string proceso)
        {
            String estado_aux = null;
            String proceso_aux = null;
            if (proceso != null && proceso.Trim() != "") { proceso_aux = proceso; ***REMOVED***
            if (estado != null && estado.Trim() != "") { estado_aux = estado; ***REMOVED***


            infograficoEntidad objReturn = new infograficoEntidad();

            var query1 = (from pre in _connection.VwPresupuesto
                          where (pre.Periodo == annio && int.Parse(pre.CodigoInstitucion) == codEntidad && pre.CodigoPrograma == codPrograma.ToString())
                          group pre by new { pre.Periodo, pre.CodigoInstitucion, pre.CodigoPrograma, pre.CodigoSubPrograma, pre.CodigoActividadObra, pre.CodigoGrupoDeGasto, pre.GrupoDeGasto, pre.CodigoObjetoDeGasto ***REMOVED*** into g
                          select new
                          {
                              periodo = g.Key.Periodo,
                              codInstitucion = g.Key.CodigoInstitucion,
                              codPrograma = g.Key.CodigoPrograma,
                              codSubprograma = g.Key.CodigoSubPrograma,
                              codGrupoGasto = g.Key.CodigoGrupoDeGasto,
                              nomGrupoGasto = g.Key.GrupoDeGasto,
                              codActividad = g.Key.CodigoActividadObra,
                              codObjeto = g.Key.CodigoObjetoDeGasto,
                              vigente = (decimal)g.Sum(t => t.Vigente),
                              
                      ***REMOVED***);



            var query2 = (from x in _connection.VWContratosXPresupuestoes
                          where (x.Periodo == annio && x.CodigoInstitucion == codEntidad && x.CodigoPrograma == codPrograma)
                          group x by new { x.Periodo, x.CodigoInstitucion, x.CodigoPrograma, x.CodigoSubPrograma, x.CodigoActividadObra, x.CodigoObjetoDeGasto, x.Ocid, x.IdBudget ***REMOVED*** into g
                          select new
                          {
                              periodo = g.Key.Periodo,
                              codInstitucion = g.Key.CodigoInstitucion.Value,
                              codPrograma = g.Key.CodigoPrograma,
                              codSubprograma = g.Key.CodigoSubPrograma,
                              codActividad = g.Key.CodigoActividadObra,
                              codObjeto = g.Key.CodigoObjetoDeGasto,
                              ocid = g.Key.Ocid,
                              contrato = g.Key.IdBudget

                      ***REMOVED***);

            var query3 = (from presupuesto in query1
                          from contratos in query2.Where(j => j.periodo == presupuesto.periodo)
                             .Where(j => j.codInstitucion == int.Parse(presupuesto.codInstitucion))
                             .Where(j => j.codPrograma.Value.ToString() == presupuesto.codPrograma)
                             .Where(j => j.codActividad == int.Parse(presupuesto.codActividad))
                             .Where(j => j.codObjeto == int.Parse(presupuesto.codObjeto))
                          from detalle in _connection.VwContratosDetalles
                          //where (detalle.EstadoProceso.Contains(estado_aux) || estado_aux == null)
                          .Where(j => j.CodigoProceso == contratos.ocid)
                          .Where(j => j.DescripcionProceso.Contains(proceso_aux) || proceso_aux == null)
                          .Where(j => j.EstadoProceso.Contains(estado_aux) || estado_aux == null)
                          .Where(j => j.OrigenInformacion.ToUpper().Contains("SEFIN"))
                          select new
                          {
                              codGrupoGasto = presupuesto.codGrupoGasto,
                              nomGrupoGasto = "grp|" + presupuesto.nomGrupoGasto,
                              codProceso = contratos.ocid,
                              descProceso = "proc|" + detalle.DescripcionProceso,
                              estadoProceso = detalle.EstadoProceso,
                              codContrato = "contr|" + detalle.CodigoContrato,
                              AportePresupuesto = detalle.ValorAdjudicado,
                              MonedaContrato = detalle.MonedaContrato,
                              UrlProceso = detalle.DocURL,
                              ValorPlaneado = detalle.ValorPlaneado,
                              ValorAdjudicado = detalle.ValorAdjudicado,
                              ValorContratado = detalle.ValorContratado,
                              Contratista = detalle.Contratista,
                              CodigoProveedor = detalle.CodigoProveedor
                      ***REMOVED***
                          ).Distinct().OrderBy(x => x.nomGrupoGasto).
                                    ThenBy(x => x.codProceso).
                                    ThenBy(x => x.codContrato).ToList();


            var queryInfo = (from info in query1
                             group info by new { info.codGrupoGasto, info.nomGrupoGasto ***REMOVED*** into g
                             select new
                             {
                                 codGrupoGasto = g.Key.codGrupoGasto,
                                 nomGrupoGasto = "grp|" + g.Key.nomGrupoGasto,
                                 vigente = (decimal)g.Sum(t => t.vigente),
                                
                         ***REMOVED***
                          ).Distinct().OrderBy(x => x.nomGrupoGasto).ToList();


            List<string> estados = query3.Select(e => e.estadoProceso).Distinct().ToList();
            infograficoGrupoGasto objGrupo = null;
            infograficoProcesos objProcesos = null;
            infograficoContratos objContratos = null;

            foreach (var fila in queryInfo) {
                objGrupo = objReturn.infoGasto.Find(p => p.Id == fila.codGrupoGasto.ToString());
                if (objGrupo == null)
                {
                    objGrupo = new infograficoGrupoGasto();
                    objGrupo.Id = fila.codGrupoGasto.ToString();
                    objGrupo.Nombre = fila.nomGrupoGasto;
                    objGrupo.presupuesto = (double)fila.vigente;
                    


                    objReturn.infoGasto.Add(objGrupo);
            ***REMOVED***
                else {
                    objGrupo.presupuesto += (double)fila.vigente;
                    
            ***REMOVED***

        ***REMOVED***

            foreach (var fila in query3)
            {

                objGrupo = objReturn.infoGasto.Find(p => p.Id == fila.codGrupoGasto.ToString());
                if (objGrupo == null)
                {
                    objGrupo = new infograficoGrupoGasto();
                    objGrupo.Id = fila.codGrupoGasto.ToString();
                    objGrupo.Nombre = fila.nomGrupoGasto;
                   



                    objProcesos = objGrupo.Detalles.Find(p => p.Id == fila.codGrupoGasto.ToString());
                    if (objProcesos == null)
                    {
                        objProcesos = new infograficoProcesos();
                        objProcesos.Id = fila.codProceso.ToString();
                        objProcesos.Nombre = fila.descProceso;
                        objProcesos.presupuesto = fila.AportePresupuesto;
                        objProcesos.Estado = fila.estadoProceso;
                        objProcesos.UrlProceso = fila.UrlProceso;
                       

                        objContratos = objProcesos.Detalles.Find(p => p.Id == fila.codContrato.ToString());
                        if (objContratos == null)
                        {
                            objContratos = new infograficoContratos();
                            objContratos.Id = fila.codContrato.ToString();
                            objContratos.Nombre = fila.codContrato;
                            objContratos.moneda = fila.MonedaContrato;
                            objContratos.contratista = fila.Contratista;
                            objContratos.proveedor = fila.CodigoProveedor;
                            objContratos.presupuesto = fila.AportePresupuesto;
                            objContratos.valor_planeado = (double)fila.ValorPlaneado;
                            objContratos.valor_adjudicado = (double)fila.ValorAdjudicado;
                            objContratos.valor_contratado = fila.ValorContratado.Value;
                            

                            objProcesos.Detalles.Add(objContratos);

                    ***REMOVED***
                        else
                        {
                            objContratos.presupuesto += fila.AportePresupuesto;
                            objContratos.valor_planeado += fila.ValorPlaneado;
                            objContratos.valor_adjudicado += fila.ValorAdjudicado;
                            objContratos.valor_contratado += fila.ValorContratado.Value;
                            

                    ***REMOVED***

                        objGrupo.Detalles.Add(objProcesos);
                ***REMOVED***
                    else
                    {
                        objProcesos.presupuesto += fila.AportePresupuesto;
                        

                        objContratos = objProcesos.Detalles.Find(p => p.Id == fila.codContrato.ToString());
                        if (objContratos == null)
                        {
                            objContratos = new infograficoContratos();
                            objContratos.Id = fila.codContrato.ToString();
                            objContratos.Nombre = fila.codContrato;
                            objContratos.moneda = fila.MonedaContrato;
                            objContratos.contratista = fila.Contratista;
                            objContratos.proveedor = fila.CodigoProveedor;
                            objContratos.presupuesto = fila.AportePresupuesto;
                            objContratos.valor_planeado = fila.ValorPlaneado;
                            objContratos.valor_adjudicado = fila.ValorAdjudicado;
                            objContratos.valor_contratado = fila.ValorContratado.Value;
                         

                            objProcesos.Detalles.Add(objContratos);

                    ***REMOVED***
                        else
                        {
                            objContratos.presupuesto += fila.AportePresupuesto;
                            objContratos.valor_planeado += fila.ValorPlaneado;
                            objContratos.valor_adjudicado += fila.ValorAdjudicado;
                            objContratos.valor_contratado += fila.ValorContratado.Value;
                         
                    ***REMOVED***

                ***REMOVED***

                    objReturn.infoGasto.Add(objGrupo);
            ***REMOVED***
                else
                {
                   
                    objProcesos = objGrupo.Detalles.Find(p => p.Id == fila.codProceso.ToString());
                    if (objProcesos == null)
                    {
                        objProcesos = new infograficoProcesos();
                        objProcesos.Id = fila.codProceso.ToString();
                        objProcesos.Nombre = fila.descProceso;
                        objProcesos.Estado = fila.estadoProceso;
                        objProcesos.UrlProceso = fila.UrlProceso;

                        objContratos = objProcesos.Detalles.Find(p => p.Id == fila.codContrato.ToString());
                        if (objContratos == null)
                        {
                            objContratos = new infograficoContratos();
                            objContratos.Id = fila.codContrato.ToString();
                            objContratos.Nombre = fila.codContrato;
                            objContratos.moneda = fila.MonedaContrato;
                            objContratos.contratista = fila.Contratista;
                            objContratos.proveedor = fila.CodigoProveedor;
                            objContratos.presupuesto = fila.AportePresupuesto;
                            objContratos.valor_planeado = fila.ValorPlaneado;
                            objContratos.valor_adjudicado = fila.ValorAdjudicado;
                            objContratos.valor_contratado = fila.ValorContratado.Value;

                            objProcesos.Detalles.Add(objContratos);

                    ***REMOVED***
                        else
                        {
                            objContratos.presupuesto += fila.AportePresupuesto;
                            objContratos.valor_planeado += fila.ValorPlaneado;
                            objContratos.valor_adjudicado += fila.ValorAdjudicado;
                            objContratos.valor_contratado += fila.ValorContratado.Value;

                    ***REMOVED***

                        objGrupo.Detalles.Add(objProcesos);
                ***REMOVED***
                    else
                    {
                        objProcesos.presupuesto += fila.AportePresupuesto;
                        objContratos = objProcesos.Detalles.Find(p => p.Id == fila.codContrato);
                        if (objContratos == null)
                        {
                            objContratos = new infograficoContratos();
                            objContratos.Id = fila.codContrato.ToString();
                            objContratos.Nombre = fila.codContrato;
                            objContratos.moneda = fila.MonedaContrato;
                            objContratos.contratista = fila.Contratista;
                            objContratos.proveedor = fila.CodigoProveedor;
                            objContratos.presupuesto = fila.AportePresupuesto;
                            objContratos.valor_planeado = fila.ValorPlaneado;
                            objContratos.valor_adjudicado = fila.ValorAdjudicado;
                            objContratos.valor_contratado = fila.ValorContratado.Value;

                            objProcesos.Detalles.Add(objContratos);

                    ***REMOVED***
                        else
                        {
                            objContratos.presupuesto += fila.AportePresupuesto;
                            objContratos.valor_planeado += fila.ValorPlaneado;
                            objContratos.valor_adjudicado += fila.ValorAdjudicado;
                            objContratos.valor_contratado += fila.ValorContratado.Value;
                    ***REMOVED***

                ***REMOVED***


            ***REMOVED***
        ***REMOVED***

            ///ordena primer nivel actividad
            var result = objReturn.infoGasto.OrderByDescending(x => x.presupuesto).ToList();
            foreach (var item in result)
            {
                //ordena nivel proceso
                item.Detalles = item.Detalles.OrderByDescending(x => x.presupuesto).ToList();
                foreach (var item_actividad in item.Detalles)
                {
                    //ordena nivel cont
                    item_actividad.Detalles = item_actividad.Detalles.OrderByDescending(x => x.presupuesto).ToList();
            ***REMOVED***
        ***REMOVED***

            objReturn.infoGasto = result;
            objReturn.programa.estados = estados;
            objReturn.programa.Id = codPrograma.ToString();


            return objReturn;

    ***REMOVED***

        public List<InfoConsolidadoPresupuesto> ObtenerRecursosPerGrupos(int annio, int codEntidad)
        {

            List<InfoConsolidadoPresupuesto> objReturn = new List<InfoConsolidadoPresupuesto>();
            var RecursosPerObjetoQuery = (from info in _connection.VwPresupuesto
                                          where info.Periodo == annio && int.Parse(info.CodigoInstitucion) == codEntidad
                                          group info by new { info.GrupoDeGasto, info.ObjetoDeGasto ***REMOVED*** into g

                                          select new InfoConsolidadoPresupuesto
                                          {
                                              labelGroup = g.Key.GrupoDeGasto,
                                              label = g.Key.ObjetoDeGasto,
                                              rawValueDouble = (double)g.Sum(g => g.Vigente),
                                      ***REMOVED***).ToList();

            objReturn = RecursosPerObjetoQuery;


            return objReturn;

    ***REMOVED***



        public List<string> GetAnniosPorEntidad(string codEntidad)
        {
            List<string> objReturn = new List<string>();
            objReturn = (from info in _connection.VwPresupuesto
                         where info.CodigoInstitucion == codEntidad
                         group info by new { annio = info.Periodo.ToString().Substring(0, 4) ***REMOVED*** into g
                         orderby g.Key.annio descending
                         select g.Key.annio
                                          ).ToList();

            return objReturn;
    ***REMOVED***

        public ModelEntidadData GetEntidadData(string codEntidad) {
            ModelEntidadData objReturn = new()
            {
                Annios = GetAnniosPorEntidad(codEntidad),
                CodigoEntidad = codEntidad,
                NombreEntidad = (from info in _connection.VwPresupuesto
                                 where info.CodigoInstitucion == codEntidad
                                 group info by new { info.Institucion ***REMOVED*** into g
                                 select g.Key.Institucion).First()
        ***REMOVED***;
            if (objReturn.Annios.Count > 0) {
                var datospresupuesto = GetDatosEntidadPorAnnio(objReturn.Annios[0],codEntidad);
                objReturn.PresupuestoEjecutadoAnnioDisplay = (decimal)datospresupuesto.PresupuestoEjecutado;
                objReturn.PresupuestoVigenteAnnioDisplay = (decimal)datospresupuesto.PresupuestoVigente;
                objReturn.PorcEjecutadoAnnioDisplay = (decimal)(datospresupuesto.PresupuestoEjecutado / datospresupuesto.PresupuestoVigente) * 100;
        ***REMOVED***
            return objReturn;
    ***REMOVED***


        public DatosEntidadAnio GetDatosEntidadPorAnnio(string anioEntidad, string codEntidad)
        {
            int.TryParse(anioEntidad, out int anio);
            DatosEntidadAnio objReturn = new();
            List<DatosEntidadAnio> consulta = (from info in _connection.VwPresupuesto
                                               join ct in _connection.CatalogoTiempoes
                                               on info.Periodo.ToString() equals ct.Periodo
                                               where info.CodigoInstitucion == codEntidad
                                               where ct.Año.ToString() == anioEntidad
                                               group info by new
                                               {
                                                   ct.Año,
                                                   info.CodigoInstitucion
                                           ***REMOVED*** into g
                                               select new DatosEntidadAnio
                                               {
                                                   PresupuestoInicial = ((decimal)g.Sum(x => x.Aprobado.Value)),
                                                   PresupuestoVigente = ((decimal)g.Sum(x => x.Vigente.Value)),
                                                   PresupuestoEjecutado = ((decimal)g.Sum(x => x.EjecucionAcumulada.Value)),

                                           ***REMOVED***).ToList();
            objReturn = consulta[0];
            return objReturn;
    ***REMOVED***



        public ModelContratosXEntidadData ObtenerInformacionContratosXEntidadPorFiltros(ContratosFiltros filtros)
        {
            ModelContratosXEntidadData _objreturn = new ModelContratosXEntidadData();
            String NombreProceso = null;
            String NombreEntidad = null;
            String CodigoProveedor = null;
            String IdProyecto = null;
            String Estado = null;
            String Moneda = null;
            String OrigenInformacion = null;
            String CodigoComprador = null;
            int? Annio = null;

            if (filtros.NombreProceso != null && filtros.NombreProceso.Trim() != "") { NombreProceso = filtros.NombreProceso; ***REMOVED***
            if (filtros.NombreEntidad != null && filtros.NombreEntidad.Trim() != "") { NombreEntidad = filtros.NombreEntidad; ***REMOVED***
            if (filtros.CodigoProveedor != null && filtros.CodigoProveedor.Trim() != "") { CodigoProveedor = filtros.CodigoProveedor; ***REMOVED***
            if (filtros.IdProyecto != null && filtros.IdProyecto.Trim() != "") { IdProyecto = filtros.IdProyecto; ***REMOVED***
            if (filtros.CodigoComprador != null && filtros.CodigoComprador.Trim() != "") { CodigoComprador = filtros.CodigoComprador; ***REMOVED***
            if (filtros.Estado != null && filtros.Estado.Trim() != "") { Estado = filtros.Estado; ***REMOVED***
            if (filtros.Moneda != null && filtros.Moneda.Trim() != "") { Moneda = filtros.Moneda; ***REMOVED***
            if (filtros.OrigenInformacion != null && filtros.OrigenInformacion.Trim() != "") { OrigenInformacion = filtros.OrigenInformacion; ***REMOVED***
            if (filtros.Annio > 0) { Annio = filtros.Annio; ***REMOVED***

            try
            {
                _objreturn.CantidadTotalRegistros = (from cont in _connection.VwContratosXEntidads
                                                     where
                                                       (cont.Proveedor.Contains(NombreEntidad) || NombreEntidad == null)
                                                       && (cont.Vigenciacontrato == Annio.ToString() || Annio == null)
                                                       && (cont.Bpin == IdProyecto || IdProyecto == null)
                                                       && (cont.Estadocontrato.Contains(Estado) || Estado == null)
                                                       && (cont.Objetodelcontrato.Contains(NombreProceso) || NombreProceso == null)
                                                       && (cont.Documentoproveedor == CodigoProveedor || CodigoProveedor == null)
                                                       && (cont.CodigoInstitucion == CodigoComprador || CodigoComprador == null)
                                                     let NUMBER = Sql.Ext.DenseRank().Over().OrderBy(cont.Proveedor).ThenBy(cont.Urlproceso).ToValue()
                                                     orderby NUMBER descending
                                                     select NUMBER
                               ).FirstOrDefault();
        ***REMOVED***
            catch
            {
                _objreturn.CantidadTotalRegistros = 0;
        ***REMOVED***


            _objreturn.Data = (from cont in _connection.VwContratosXEntidads
                               where
                                                       (cont.Proveedor.Contains(NombreEntidad) || NombreEntidad == null)
                                                       && (cont.Vigenciacontrato == Annio.ToString() || Annio == null)
                                                       && (cont.Bpin == IdProyecto || IdProyecto == null)
                                                       && (cont.Estadocontrato.Contains(Estado) || Estado == null)
                                                       && (cont.Objetodelcontrato.Contains(NombreProceso) || NombreProceso == null)
                                                       && (cont.Documentoproveedor == CodigoProveedor || CodigoProveedor == null)
                                                       && (cont.CodigoInstitucion == CodigoComprador || CodigoComprador == null)
                               let NUMBER = Sql.Ext.DenseRank().Over().OrderBy(cont.Proveedor).ThenBy(cont.Urlproceso).ToValue()
                               where
                               NUMBER > ((filtros.NumeroPagina - 1) * filtros.RegistrosPorPagina)
                               && NUMBER <= (filtros.NumeroPagina * filtros.RegistrosPorPagina)
                               select new ContratosXEntidadData
                               {
                                   CodigoInstitucion = cont.CodigoInstitucion,
                                   Tipodocproveedor = cont.Tipodocproveedor,
                                   Documentoproveedor = cont.Documentoproveedor,
                                   Proveedor = cont.Proveedor,
                                   Estadocontrato = cont.Estadocontrato,
                                   Referenciacontrato = cont.Referenciacontrato,
                                   Valorcontrato = cont.Valorcontrato,
                                   Urlproceso = cont.Urlproceso,
                                   Vigenciacontrato = cont.Vigenciacontrato,
                                   Objetodelcontrato = cont.Objetodelcontrato,
                                   CodigoProceso = cont.Codigoproceso
                                 
                           ***REMOVED***
                             ).Distinct().ToList();

            return _objreturn;
    ***REMOVED***


        public itemGenInversion ObtenerRecursosPerTipo(int annio, string codEntidad, string tipo, string programa)
        {
            itemGenInversion objReturn = new itemGenInversion();
            objReturn.proyInv = new List<itemGenPresupuesto>();
            objReturn.otrasLineas = new List<itemLineaPresupuestal>();
            if (tipo != null)
            {
                if (tipo.ToUpper().Equals("INVERSION"))
                {
                    var queryInfo = (from info in _connection.VwPresupuestoXProyInvs
                                     join pre in _connection.VwPresupuesto on new { info.IdCatalogoLineaPresupuestal, info.CodigoObjetoDeGasto, info.CodigoInstitucion, info.Periodo ***REMOVED*** equals new { pre.IdCatalogoLineaPresupuestal, pre.CodigoObjetoDeGasto, pre.CodigoInstitucion, pre.Periodo ***REMOVED***
                                     join t in _connection.CatalogoTiempoes on pre.Periodo.ToString().Substring(0, 11) equals t.Periodo.ToString().Substring(0, 11)
                                     where info.Periodo.ToString().Substring(0, 11).Contains(annio.ToString()) &&
                                           info.CodigoInstitucion == codEntidad &&
                                           pre.CodigoPrograma == programa
                                     group new { info, pre ***REMOVED*** by new
                                     {
                                         info.Bpin,
                                         info.Nombreproyecto,
                                         pre.ObjetoDeGasto
                                 ***REMOVED*** into g
                                     orderby g.Key.Bpin, g.Key.ObjetoDeGasto
                                     select new
                                     {
                                         bpin=g.Key.Bpin,
                                         nombre=g.Key.Nombreproyecto,
                                         objeto=g.Key.ObjetoDeGasto,
                                         avance_fisico = g.Max(x => x.info.Avancefisico),
                                         avance_financiero = g.Max(x => x.info.Avancefinanciero),
                                         url = g.Max(x => x.info.URLProyecto),
                                         Vigente = g.Sum(x => x.pre.Vigente) / 1000000,
                                         Aprobado = g.Sum(x => x.pre.Aprobado) / 1000000,
                                         Ejecutado = g.Sum(x => x.pre.EjecucionAcumulada) / 1000000,
                                         valor_proyecto = g.Max(x => x.info.ValorProyecto)
                                 ***REMOVED***).Distinct().ToList();
                    itemGenPresupuesto objProy = null;
                    itemLineaPresupuestal objLineas = null;
                    itemLineaPresupuestal objRecursos = null;
                    foreach (var fila in queryInfo)
                    {
                        if (fila.bpin == null)
                        {
                            objLineas = objReturn.otrasLineas.Find(p => p.nombre == fila.objeto);
                            if (objLineas == null)
                            {
                                objLineas = new itemLineaPresupuestal();
                                objLineas.nombre = fila.objeto;
                                objLineas.vigente = (decimal)fila.Vigente.Value;
                                objLineas.aprobado = (decimal)fila.Aprobado.Value;
                                objLineas.ejecutado = (decimal)fila.Ejecutado.Value;
                                objLineas.porcentaje = (decimal)((objLineas.vigente.HasValue && objLineas.vigente.Value > 0) ? ((objLineas.ejecutado / objLineas.vigente.Value)) : 0);
                                objReturn.otrasLineas.Add(objLineas);
                        ***REMOVED***
                            else
                            {
                                objLineas.vigente += (decimal)fila.Vigente.Value;
                                objLineas.aprobado += (decimal)fila.Aprobado.Value;
                                objLineas.ejecutado += (decimal)fila.Ejecutado.Value;
                                objLineas.porcentaje = (decimal)((objLineas.vigente.HasValue && objLineas.vigente.Value > 0) ? ((objLineas.ejecutado / objLineas.vigente.Value)) : 0);
                        ***REMOVED***
                    ***REMOVED***
                        else
                        {
                            objProy = objReturn.proyInv.Find(p => p.id == fila.bpin);
                            if (objProy == null)
                            {
                                objProy = new itemGenPresupuesto();
                                objProy.id = fila.bpin;
                                objProy.nombre = fila.nombre;
                                objProy.avance_fisico = (double?)fila.avance_fisico ?? 0;
                                objProy.avance_financiero = (double?)fila.avance_financiero ?? 0;
                                objProy.url = fila.url;
                                objProy.comprometido = fila.valor_proyecto??0;
                                objRecursos = objProy.detalleLineas.Find(p => p.nombre == fila.objeto);
                                if (objRecursos == null)
                                {
                                    objRecursos = new itemLineaPresupuestal();
                                    objRecursos.nombre = fila.objeto;
                                    objRecursos.vigente = (decimal)fila.Vigente.Value;
                                    objRecursos.aprobado = (decimal)fila.Aprobado.Value;
                                    objRecursos.ejecutado = (decimal)fila.Ejecutado.Value;
                                    objRecursos.porcentaje = (decimal)((objRecursos.vigente.HasValue && objRecursos.vigente.Value > 0) ? ((objRecursos.ejecutado / objRecursos.vigente.Value)) : 0);
                                    objProy.detalleLineas.Add(objRecursos);
                            ***REMOVED***
                                objReturn.proyInv.Add(objProy);
                        ***REMOVED***
                            else
                            {
                                objRecursos = objProy.detalleLineas.Find(p => p.nombre == fila.objeto);
                                if (objRecursos == null)
                                {
                                    objRecursos = new itemLineaPresupuestal();
                                    objRecursos.nombre = fila.objeto;
                                    objRecursos.vigente = (decimal)fila.Vigente.Value;
                                    objRecursos.aprobado = (decimal)fila.Aprobado.Value;
                                    objRecursos.ejecutado = (decimal)fila.Ejecutado.Value;
                                    objRecursos.porcentaje = (decimal)((objRecursos.vigente.HasValue && objRecursos.vigente.Value > 0) ? ((objRecursos.ejecutado / objRecursos.vigente.Value) ) : 0);
                                    objProy.detalleLineas.Add(objRecursos);
                            ***REMOVED***
                                else
                                {
                                    objRecursos.vigente += (decimal)fila.Vigente.Value;
                                    objRecursos.aprobado += (decimal)fila.Aprobado.Value;
                                    objRecursos.ejecutado += (decimal)fila.Ejecutado.Value;
                                    objRecursos.porcentaje = (decimal)((objRecursos.vigente.HasValue && objRecursos.vigente.Value > 0) ? ((objRecursos.ejecutado / objRecursos.vigente.Value) ) : 0);
                            ***REMOVED***
                        ***REMOVED***
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
                else
                {
                    var RecursosPerObjetoQuery = (from info in _connection.VwPresupuesto
                                                  where info.Periodo == annio && info.CodigoInstitucion == codEntidad && info.CodigoPrograma == programa
                                                  && info.TipoGasto == tipo
                                                  group info by new { info.ObjetoDeGasto ***REMOVED*** into g

                                                  select new itemGenPresupuesto
                                                  {
                                                      nombre = g.Key.ObjetoDeGasto,
                                                      vigente = (decimal)g.Sum(g => g.Vigente.Value),
                                                      aprobado = (decimal)g.Sum(g => g.Aprobado.Value),
                                                      ejecutado = (decimal)g.Sum(g => g.EjecucionAcumulada.Value)
                                              ***REMOVED***).ToList();
                    objReturn.genericoTipo = RecursosPerObjetoQuery;
            ***REMOVED***
        ***REMOVED***
           return objReturn;
    ***REMOVED***

        public List<InfoConsolidadoPresupuesto> GetRecursosPorfinalidad(int annio, string codEntidad)
        {
            List<InfoConsolidadoPresupuesto> objReturn = (from info in _connection.VwPresupuesto
                                                          join ct in _connection.CatalogoTiempoes on info.Periodo.ToString() equals ct.Periodo
                                                          where ct.Año == annio && info.CodigoInstitucion == codEntidad
                                                          group info by new { info.Finalidad, info.Sector ***REMOVED*** into g
                                                          select new InfoConsolidadoPresupuesto
                                                          {
                                                              labelGroup = g.Key.Finalidad,
                                                              label = g.Key.Sector,
                                                              rawValueDouble = g.Sum(g => g.Vigente.Value)
                                                      ***REMOVED***).OrderBy(x => x.labelGroup).ThenBy(n => n.label).ToList();
            return objReturn;
    ***REMOVED***

        public List<InfoConsolidadoPresupuesto> GetDistribucionGastoEntidad(int annio, string codEntidad)
        {
            List<InfoConsolidadoPresupuesto> objReturn = new List<InfoConsolidadoPresupuesto>();
            var RecursosPerObjetoQuery = (from info in _connection.VwPresupuesto
                                          join ct in _connection.CatalogoTiempoes on info.Periodo.ToString() equals ct.Periodo
                                          where ct.Año == annio && info.CodigoInstitucion == codEntidad
                                          group info by new { info.GrupoDeGasto ***REMOVED*** into g
                                          select new InfoConsolidadoPresupuesto
                                          {
                                              labelGroup = g.Key.GrupoDeGasto,
                                              rawValue = (decimal)g.Sum(g => g.Vigente.Value)
                                      ***REMOVED***).OrderByDescending(x => x.rawValue).ToList();
         
            var objTotalPeriodo = RecursosPerObjetoQuery.Sum(x => x.rawValue);
            foreach (var item in RecursosPerObjetoQuery)
            {
                if (objTotalPeriodo > 0)
                {
                    item.porcentaje = (decimal)Math.Round((item.rawValue / objTotalPeriodo) * 100, 4);
            ***REMOVED***
        ***REMOVED***
            int i = 0;
            decimal otros = 0;
            decimal porcentaje = 0;
            foreach (var item in RecursosPerObjetoQuery)
            {
                if (i >= 5)
                {
                    otros = item.rawValue + otros;
                    porcentaje = item.porcentaje + porcentaje;
                    
            ***REMOVED***
                else {
                    objReturn.Add(item);
            ***REMOVED***
                i = i + 1;
        ***REMOVED***
            if (i >= 5)
            {
                InfoConsolidadoPresupuesto objotros = new InfoConsolidadoPresupuesto();
            objotros.rawValue = otros;
            objotros.porcentaje=porcentaje;
            objotros.labelGroup = "OTROS";
            objReturn.Add(objotros);
        ***REMOVED***
            return objReturn;
    ***REMOVED***

        public List<ContratosXEntidadData> ObtenerProveedor(string Proveedor, string CodigoInstitucion)
        {
            List<ContratosXEntidadData> objreturn = (from cont in _connection.VwContratosXEntidads
                                                      where (cont.Proveedor.Contains(Proveedor) && cont.CodigoInstitucion.Equals(CodigoInstitucion))
                                                      group cont by new { cont.Proveedor, cont.Documentoproveedor ***REMOVED*** into g
                                                      select new ContratosXEntidadData
                                                      {
                                                          Proveedor = g.Key.Proveedor,
                                                          Documentoproveedor = g.Key.Proveedor
                                                  ***REMOVED***).Distinct().ToList();
            return objreturn;
    ***REMOVED***

        public List<InfoConsolidadoPresupuesto> GetProcesosPorTipo(int annio, string codEntidad)
        {

            List<InfoConsolidadoPresupuesto> objReturn = new List<InfoConsolidadoPresupuesto>();
            var RecursosPerObjetoQuery = (from info in _connection.VwProcesosXInstitucionModalidads
                                          where info.Año == annio && info.CodigoInstitucion == codEntidad
                                          
                                          select new InfoConsolidadoPresupuesto
                                          {
                                              labelGroup = info.Modalidad,
                                              label = info.Año.ToString(),
                                              rawValueDouble = (double)info.Cantidad
                                      ***REMOVED***).ToList();

            objReturn = RecursosPerObjetoQuery;


            return objReturn;

    ***REMOVED***

        public List<ProcesosXEntidadData> GetProcesosPorAnio(int annio, string codEntidad)
        {

            List<ProcesosXEntidadData> objReturn = new List<ProcesosXEntidadData>();
            var RecursosPerObjetoQuery = (from info in _connection.VwProcesosXProyectosInstitucionesAnios
                                          where info.AnioPresupuesto == annio && info.CodigoInstitucion == codEntidad

                                          select new ProcesosXEntidadData
                                          {
                                              Bpin = info.Bpin,
                                              NombreProyecto = info.NombreProyecto,
                                              Codigoproceso = info.Codigoproceso,
                                              Descripcion = info.Descripcion,
                                              Caratula = info.Caratula,
                                              EstadoProceso = info.EstadoProceso,
                                              MontoEstimado = info.MontoEstimado,
                                              Modalidad = info.Modalidad,
                                              Url = info.Url

                                      ***REMOVED***).Distinct().ToList();

            objReturn = RecursosPerObjetoQuery;


            return objReturn;

    ***REMOVED***

***REMOVED***
***REMOVED***
