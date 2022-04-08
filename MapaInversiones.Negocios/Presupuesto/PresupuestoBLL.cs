using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PlataformaTransparencia.Infrastructura.DataModels;
using PlataformaTransparencia.Modelos;

namespace PlataformaTransparencia.Negocios.Presupuesto
***REMOVED***
    public class PresupuestoBLL
    ***REMOVED***

        private readonly TransparenciaDB _connection;

        public PresupuestoBLL(TransparenciaDB connection)
        ***REMOVED***
            _connection = connection;
    ***REMOVED***

        public List<InfoPresupuesto> ObtenerPresupuesto(int consulta, int annio)
        ***REMOVED***
            List<InfoPresupuesto> objReturn = new List<InfoPresupuesto>();
            if (consulta == 0) ***REMOVED***
                //var query1 = (from notpre in _connection.PresupuestoVigenteXSectorMinHaciendas
                //              where notpre.AnioPresupuesto == annio
                //             group notpre by notpre.Sectores into g
                //             orderby g.Sum(h => h.PresupuestoVigente) descending
                //             select g.Key).Take(4);

                //objReturn = (from pre in _connection.PresupuestoVigenteXSectorMinHaciendas
                //             where pre.AnioPresupuesto == annio
                //             group pre by pre.Sectores into g
                //                           select new InfoPresupuesto ***REMOVED***
                //                               rawValue = (decimal)g.Sum(g => g.PresupuestoVigente)/1000000,
                //                               labelGroup = g.Key
                //                       ***REMOVED***).OrderByDescending(g => g.rawValue).Take(4)
                //                           //.Union(from pre in _connection.PresupuestoXSectorMinHaciendas
                //                           //       where pre.AnioPresupuesto == annio && pre.CodigoVersion == 50
                //                           //       && !pre.Sectores == query1
                //                           //       group pre by pre.Sectores into g
                //                           //       select new InfoPresupuesto ***REMOVED***
                //                           //           rawValue = (decimal)g.Sum(g => g.Presupuesto),
                //                           //           labelGroup = g.Key
                //                           //   ***REMOVED***)
                //                           .ToList();
        ***REMOVED***
            if (consulta == 1) ***REMOVED***
                objReturn = (from pre in _connection.PresupuestoVigenteXSectorMinHaciendas
                             where pre.AnioPresupuesto == annio
                             group pre by new ***REMOVED*** pre.Sectores, pre.NombreEntidad ***REMOVED*** into g
                                           select new InfoPresupuesto ***REMOVED***
                                               rawValue = (decimal)g.Sum(g => g.PresupuestoVigente) / 1000000,
                                               labelGroup = g.Key.Sectores,
                                               label=g.Key.NombreEntidad
                                       ***REMOVED***).ToList();
        ***REMOVED***
            if (consulta == 2) ***REMOVED***
                objReturn = (from pre in _connection.PresupuestoVigenteXSectorMinHaciendas
                             where pre.AnioPresupuesto == annio
                             group pre by new ***REMOVED*** pre.Clasificacion, pre.NombreEntidad ***REMOVED*** into g
                                           select new InfoPresupuesto ***REMOVED***
                                               rawValue = (decimal)g.Sum(g => g.PresupuestoVigente) / 1000000,
                                               labelGroup = g.Key.Clasificacion,
                                               label=g.Key.NombreEntidad
                                       ***REMOVED***).ToList();
        ***REMOVED***

            return objReturn;

    ***REMOVED***

        public List<InfoPresupuesto> ObtenerPresupuestoTotalAnnio(int annio)
        ***REMOVED***
            List<InfoPresupuesto> objReturn = new List<InfoPresupuesto>();
            objReturn = (from pre in _connection.PresupuestoVigenteXSectorMinHaciendas
                         where pre.AnioPresupuesto == annio
                            group pre by pre.CodigoVersion into g
                            select new InfoPresupuesto ***REMOVED***
                                 totalGasto = (decimal)g.Sum(g => g.PresupuestoVigente),
                                 totalPresupuesto = (decimal)g.Sum(g => g.PresupuestoVigente),
                                 trimestre = "3", //cambiar cuando se tenga fecha en la tabla
                                 annio = annio
                         ***REMOVED***).ToList();
            

            return objReturn;
***REMOVED***

        public List<InfoPresupuesto> ObtenerGastoSectores(int consulta, int annio)
        ***REMOVED***
            List<InfoPresupuesto> objReturn = new List<InfoPresupuesto>();
            if (consulta == 0) ***REMOVED***

                var query1 = (from pre in _connection.PresupuestoVigenteXSectorMinHaciendas
                              where pre.AnioPresupuesto == annio
                              group pre by new ***REMOVED*** pre.Sectores ***REMOVED*** into g
                              select new InfoPresupuesto ***REMOVED***
                                  rawValue = (decimal)(g.Sum(g => g.PresupuestoVigente)/1000000),
                                  label = g.Key.Sectores,
                          ***REMOVED***).OrderByDescending(g => g.rawValue).Take(4);

                objReturn = (from pre in _connection.PresupuestoVigenteXSectorMinHaciendas
                             where pre.AnioPresupuesto == annio && (pre.CodigoVersion == 2 || pre.CodigoVersion == 50)
                                group pre by new ***REMOVED*** pre.Sectores, pre.CodigoVersion ***REMOVED*** into g
                                from que in query1.Where(j => j.label == g.Key.Sectores)
                                select new InfoPresupuesto ***REMOVED***
                                    rawValue = (decimal)(g.Sum(g => g.PresupuestoVigente) / 1000000),
                                    label = g.Key.Sectores,
                                    labelGroup = (annio == 2022 ?  "Presupuesto Proyecto Ejecutivo por sector" : "Presupuesto Vigente por sector")
                            ***REMOVED***).Union(
                             (from pre in _connection.PresupuestoVigenteXSectorMinHaciendas
                             where pre.AnioPresupuesto == annio && (pre.CodigoVersion == 2 || pre.CodigoVersion == 50)
                             group pre by new ***REMOVED*** pre.Sectores, pre.CodigoVersion ***REMOVED*** into g
                             from que in query1.Where(j => j.label == g.Key.Sectores)
                             select new InfoPresupuesto ***REMOVED***
                                 rawValue = (decimal)(g.Sum(g => g.PresupuestoAvance) / 1000000),
                                 label = g.Key.Sectores,
                                 labelGroup = "Presupuesto Avance por sector"
                         ***REMOVED***)).OrderByDescending(g => g.rawValue).ToList();

                //objReturn = (from pre in _connection.PresupuestoXSectorMinHaciendas
                //             where pre.AnioPresupuesto == annio && (pre.CodigoVersion==2 || pre.CodigoVersion == 50)
                //             orderby pre.Presupuesto descending
                //             group pre by new ***REMOVED*** pre.Sectores, pre.CodigoVersion ***REMOVED*** into g
                //             select new InfoPresupuesto ***REMOVED***
                //                 rawValue = (decimal)g.Sum(g => g.Presupuesto),
                //                // totalGasto = g.Key.CodigoVersion == 2 ? g.Sum(g => g.Presupuesto) : null,
                //                 label = g.Key.Sectores,
                //                 labelGroup = g.Key.CodigoVersion ==2 ? "Presupuesto asignado al sector" : g.Key.CodigoVersion == 50 ? "Gasto ecónomico por sector" :""
                //         ***REMOVED***).Take(8).ToList();
        ***REMOVED***
            if (consulta == 1) ***REMOVED***

                objReturn = (from pre in _connection.PresupuestoVigenteXSectorMinHaciendas
                             where pre.AnioPresupuesto == annio && (pre.CodigoVersion == 2 || pre.CodigoVersion == 50)
                             group pre by new ***REMOVED*** pre.Sectores, pre.CodigoVersion ***REMOVED*** into g
                             select new InfoPresupuesto ***REMOVED***
                                 rawValue = (decimal)(g.Sum(g => g.PresupuestoVigente) / 1000000),
                                 //totalGasto = g.Key.CodigoVersion == 2 ? g.Sum(g => g.Presupuesto) : null,
                                 label = g.Key.Sectores,
                                 labelGroup = "Presupuesto Vigente por sector" 
                         ***REMOVED***).Union
                             (from pre in _connection.PresupuestoVigenteXSectorMinHaciendas
                              where pre.AnioPresupuesto == annio && (pre.CodigoVersion == 2 || pre.CodigoVersion == 50)
                              group pre by new ***REMOVED*** pre.Sectores, pre.CodigoVersion ***REMOVED*** into g
                              select new InfoPresupuesto ***REMOVED***
                                  rawValue = (decimal)(g.Sum(g => g.PresupuestoAvance) / 1000000),
                                  //totalGasto = g.Key.CodigoVersion == 2 ? g.Sum(g => g.Presupuesto) : null,
                                  label = g.Key.Sectores,
                                  labelGroup =  "Presupuesto Avance por sector" 
                          ***REMOVED***).OrderByDescending(g => g.rawValue).ToList();
        ***REMOVED***
    
            return objReturn;

    ***REMOVED***


        public List<InfoPresupuesto> ObtenerPresupuestoSolicitadoAprobado(int consulta, int annio, int version1, int version2)
        ***REMOVED***
             List<InfoPresupuesto> objReturn = new List<InfoPresupuesto>();
            if (consulta == 0) ***REMOVED***

                var query1 = (from pre in _connection.PresupuestoXVersionMinHacientas
                              where pre.AnioPresupuesto == annio && (pre.CodigoVersion == version1)
                              group pre by new ***REMOVED*** pre.Sectores, pre.NombreVersion ***REMOVED*** into g
                              select new InfoPresupuesto ***REMOVED***
                                  rawValue = (decimal)(g.Sum(g => g.Presupuesto) / 1000000),
                                  label = g.Key.Sectores,
                          ***REMOVED***).OrderByDescending(g => g.rawValue).Take(4);


                objReturn = (from pre in _connection.PresupuestoXVersionMinHacientas
                             where pre.AnioPresupuesto == annio && (pre.CodigoVersion == version1 || pre.CodigoVersion == version2)
                             orderby pre.Presupuesto descending
                             group pre by new ***REMOVED*** pre.Sectores, pre.NombreVersion ***REMOVED*** into g
                             from que in query1.Where(j => j.label == g.Key.Sectores)
                             select new InfoPresupuesto ***REMOVED***
                                 //totalPresupuesto = g.Key.CodigoVersion == 50 ? g.Sum(g => g.Presupuesto) : null,
                                 //totalGasto = g.Key.CodigoVersion == 2 ? g.Sum(g => g.Presupuesto) : null,
                                 //totalMH= g.Key.CodigoVersion == 23 ? g.Sum(g => g.Presupuesto) : null,
                                 rawValue = (decimal)(g.Sum(g => g.Presupuesto) / 1000000),
                                 label = g.Key.Sectores,
                                 labelGroup = g.Key.NombreVersion //g.Key.CodigoVersion == 2 ? "Presupuesto solicitado por entidades" : g.Key.CodigoVersion == 23 ? "Presupuesto aprobado por MH" : g.Key.CodigoVersion == 50 ? "Presupuesto por aprobado el Congreso" : ""
                         ***REMOVED***).ToList();
        ***REMOVED***
            if (consulta == 1) ***REMOVED***
                objReturn = (from pre in _connection.PresupuestoXVersionMinHacientas
                             where pre.AnioPresupuesto == annio && (pre.CodigoVersion == version1 || pre.CodigoVersion == version2)
                             orderby pre.Presupuesto descending
                             group pre by new ***REMOVED*** pre.Sectores, pre.NombreVersion ***REMOVED*** into g
                             select new InfoPresupuesto ***REMOVED***
                                 //totalPresupuesto = g.Key.CodigoVersion == 50 ? g.Sum(g => g.Presupuesto) : null,
                                 //totalGasto = g.Key.CodigoVersion == 2 ? g.Sum(g => g.Presupuesto) : null,
                                 //totalMH = g.Key.CodigoVersion == 23 ? g.Sum(g => g.Presupuesto) : null,
                                 rawValue = (decimal)(g.Sum(g => g.Presupuesto) / 1000000),
                                 label = g.Key.Sectores,
                                 labelGroup = g.Key.NombreVersion// g.Key.CodigoVersion == 2 ? "Presupuesto solicitado por entidades" : g.Key.CodigoVersion == 23 ? "Presupuesto aprobado por MH" : g.Key.CodigoVersion == 50 ? "Presupuesto por aprobado el Congreso" : ""
                         ***REMOVED***).OrderByDescending(g => g.rawValue).ToList();
        ***REMOVED***

            return objReturn;

    ***REMOVED***


        public List<InfoPresupuesto> ObtenerGastoPresupuestalTiempo(int consulta, int annio)
        ***REMOVED***
            List<InfoPresupuesto> objReturn = new List<InfoPresupuesto>();
            
            if (consulta == 0) ***REMOVED***

                var query1 = (from pre in _connection.PresupuestoVigenteXSectorMinHaciendas
                              where  (pre.AnioPresupuesto > DateTime.Today.Year-5)
                              group pre by new ***REMOVED*** pre.Sectores, pre.AnioPresupuesto ***REMOVED*** into g
                              select new  InfoPresupuesto ***REMOVED***
                                  totalGasto = (decimal)g.Sum(g => g.PresupuestoVigente),
                                  labelGroup = g.Key.Sectores,
                                  label = g.Key.AnioPresupuesto.ToString()
                          ***REMOVED***);
                var query2 = (from pre in query1
                              group pre by new ***REMOVED*** pre.label ***REMOVED*** into g
                              select new InfoPresupuesto ***REMOVED***
                                  totalPresupuesto = g.Sum(t => t.totalGasto),
                                  label = g.Key.label
                          ***REMOVED***);
                objReturn = (from pre in query1
                             from gas in query2.Where(j => j.label == pre.label)
                             select new InfoPresupuesto ***REMOVED***
                                 rawValue = (gas.totalPresupuesto > 0 ? (decimal)((pre.totalGasto / gas.totalPresupuesto) *100) : 0),
                                 labelGroup = pre.labelGroup,
                                 label = pre.label
                         ***REMOVED***).ToList();

                
        ***REMOVED***
            if (consulta == 1) ***REMOVED***
                //busco total por sector en cada año
                var query1 = (from pre in _connection.PresupuestoVigenteXSectorMinHaciendas
                              group pre by new ***REMOVED*** pre.Sectores,  pre.AnioPresupuesto ***REMOVED*** into g
                              select new InfoPresupuesto ***REMOVED***
                                  totalGasto = (decimal)g.Sum(g => g.PresupuestoVigente), //temporal para total de cada sector
                                  labelGroup = g.Key.Sectores,
                                  label = g.Key.AnioPresupuesto.ToString()
                          ***REMOVED***);
                // busco total del presupuesto en cada año
                var query2 = (from pre in query1
                              group pre by new ***REMOVED*** pre.label ***REMOVED*** into g
                              select new InfoPresupuesto ***REMOVED***
                                  totalPresupuesto = g.Sum(t => t.totalGasto), //temporal para total de cada año
                                  label = g.Key.label
                          ***REMOVED***);
                // obtengo porcentaje del presupuesto total por sector en cada año
                objReturn = (from pre in query1
                             from gas in query2.Where(j => j.label == pre.label)
                             select new InfoPresupuesto ***REMOVED***
                                 rawValue = (gas.totalPresupuesto > 0 ? (decimal)((pre.totalGasto / gas.totalPresupuesto) * 100) : 0), //porcentaje
                                 labelGroup = pre.labelGroup,
                                 label = pre.label
                         ***REMOVED***).OrderByDescending(g => g.rawValue).ToList();
        ***REMOVED***

            return objReturn;

    ***REMOVED***

        public List<InfoPresupuesto> ObtenerGrupoDeGasto(int consulta, int annio)
        ***REMOVED***
            List<InfoPresupuesto> objReturn = new List<InfoPresupuesto>();

            if (consulta == 0) ***REMOVED***

                //var query0 = ((from pre in _connection.PresupuestoVigenteXSectorMinHaciendas
                //               where pre.AnioPresupuesto == annio ///presupuesto año seleccionado
                //               group pre by new ***REMOVED*** pre.DescripcionGrupo ***REMOVED*** into g
                //               select new InfoPresupuesto ***REMOVED***
                //                   rawValue = (decimal)(g.Sum(g => g.PresupuestoVigente)),
                //                   labelGroup = g.Key.DescripcionGrupo
                //           ***REMOVED***).OrderByDescending(g => g.rawValue).Take(4));

                var query1 = (from pre in _connection.PresupuestoVigenteXSectorMinHaciendas
                              where (pre.AnioPresupuesto == annio - 1) //datos del año anterior al seleccionado
                              group pre by new ***REMOVED*** pre.DescripcionGrupo, pre.AnioPresupuesto ***REMOVED*** into g
                              from q0 in ((from pre in _connection.PresupuestoVigenteXSectorMinHaciendas
                                           where pre.AnioPresupuesto == annio ///top del presupuesto del año seleccionado
                                           group pre by new ***REMOVED*** pre.DescripcionGrupo ***REMOVED*** into h
                                           select new InfoPresupuesto ***REMOVED***
                                               rawValue = (decimal)(h.Sum(h => h.PresupuestoVigente)),
                                               labelGroup = h.Key.DescripcionGrupo
                                       ***REMOVED***).OrderByDescending(h => h.rawValue).Take(4))
                                           .Where(j => j.labelGroup == g.Key.DescripcionGrupo) //inner join
                              select new InfoPresupuesto ***REMOVED***
                                  totalGasto = (decimal)g.Sum(g => g.PresupuestoVigente) / 1000000, 
                                  labelGroup = g.Key.DescripcionGrupo,
                                  annio = g.Key.AnioPresupuesto,
                                  rawValue=0
                          ***REMOVED***);

                var annioanterior = query1.Count(); /// saber si existendatos del año anterior al seleccionado

                var query2 = (from pre in _connection.PresupuestoVigenteXSectorMinHaciendas
                              where (pre.AnioPresupuesto == annio) //datos año seleccionado
                              group pre by new ***REMOVED*** pre.DescripcionGrupo, pre.AnioPresupuesto ***REMOVED*** into g
                              from q0 in ((from pre in _connection.PresupuestoVigenteXSectorMinHaciendas
                                           where pre.AnioPresupuesto == annio 
                                           group pre by new ***REMOVED*** pre.DescripcionGrupo ***REMOVED*** into h
                                           select new InfoPresupuesto ***REMOVED***
                                               rawValue = (decimal)(h.Sum(h => h.PresupuestoVigente)),
                                               labelGroup = h.Key.DescripcionGrupo
                                       ***REMOVED***).OrderByDescending(h => h.rawValue).Take(4))
                              .Where(j => j.labelGroup == g.Key.DescripcionGrupo)
                              select new InfoPresupuesto ***REMOVED***
                                  totalPresupuesto = (decimal)g.Sum(t => t.PresupuestoVigente) / 1000000,
                                  labelGroup = g.Key.DescripcionGrupo,
                                  annio = g.Key.AnioPresupuesto,
                                  rawValue=0
                          ***REMOVED***);
                if (annioanterior > 0) ***REMOVED***

                    objReturn = (from gas in query1
                                      from pre in query2.Where(j => j.labelGroup == gas.labelGroup).DefaultIfEmpty()
                                      select new InfoPresupuesto ***REMOVED***
                                          rawValue = (gas.totalGasto > 0 ? (decimal)((pre.totalPresupuesto / gas.totalGasto) * 100) - 100 : 0),
                                          labelGroup = pre.labelGroup,
                                          annio = pre.annio,
                                          totalPresupuesto = pre.totalPresupuesto

                                  ***REMOVED***).OrderByDescending(g => g.totalPresupuesto).Union(from gas in query1
                                                                                          from pre in query2.Where(j => j.labelGroup == gas.labelGroup).DefaultIfEmpty()
                                                                                          select new InfoPresupuesto ***REMOVED***
                                                                                              rawValue = (gas.totalGasto > 0 ? (decimal)((pre.totalPresupuesto / gas.totalGasto) * 100) - 100 : 0),
                                                                                              labelGroup = pre.labelGroup,
                                                                                              annio = gas.annio,
                                                                                              totalPresupuesto = gas.totalGasto

                                                                                      ***REMOVED***).OrderBy(g => g.annio).ThenByDescending(g => g.totalPresupuesto)

                   .ToList();
            ***REMOVED***
                else ***REMOVED***
                    objReturn = query2.ToList();


            ***REMOVED***

        ***REMOVED***
            if (consulta == 1) ***REMOVED***
                var query1 = (from pre in _connection.PresupuestoVigenteXSectorMinHaciendas
                              where (pre.AnioPresupuesto == annio - 1)
                              group pre by new ***REMOVED*** pre.DescripcionGrupo, pre.AnioPresupuesto ***REMOVED*** into g
                              select new InfoPresupuesto ***REMOVED***
                                  totalGasto = (decimal)g.Sum(g => g.PresupuestoVigente) / 1000000, ///presupuesto año anterior al seleccionado
                                  labelGroup = g.Key.DescripcionGrupo,
                                  annio = g.Key.AnioPresupuesto,
                                  rawValue = 0
                          ***REMOVED***);

                var annioanterior = query1.Count();

                var query2 = (from pre in _connection.PresupuestoVigenteXSectorMinHaciendas
                              where (pre.AnioPresupuesto == annio)
                              group pre by new ***REMOVED*** pre.DescripcionGrupo, pre.AnioPresupuesto ***REMOVED*** into g
                              select new InfoPresupuesto ***REMOVED***
                                  totalPresupuesto = (decimal)g.Sum(t => t.PresupuestoVigente) / 1000000,
                                  labelGroup = g.Key.DescripcionGrupo,
                                  annio = g.Key.AnioPresupuesto,
                                  rawValue = 0
                          ***REMOVED***);
                if (annioanterior > 0) ***REMOVED***

                    objReturn = (from gas in query1
                                 from pre in query2.Where(j => j.labelGroup == gas.labelGroup).DefaultIfEmpty()
                                 select new InfoPresupuesto ***REMOVED***
                                     rawValue = (gas.totalGasto > 0 ? (decimal)((pre.totalPresupuesto / gas.totalGasto) * 100) - 100 : 0),
                                     labelGroup = pre.labelGroup,
                                     annio = pre.annio,
                                     totalPresupuesto = pre.totalPresupuesto

                             ***REMOVED***).OrderByDescending(g => g.totalPresupuesto).Union(from gas in query1
                                                                                     from pre in query2.Where(j => j.labelGroup == gas.labelGroup).DefaultIfEmpty()
                                                                                     select new InfoPresupuesto ***REMOVED***
                                                                                         rawValue = (gas.totalGasto > 0 ? (decimal)((pre.totalPresupuesto / gas.totalGasto) * 100) - 100 : 0),
                                                                                         labelGroup = pre.labelGroup,
                                                                                         annio = gas.annio,
                                                                                         totalPresupuesto = gas.totalGasto

                                                                                 ***REMOVED***).OrderBy(g => g.annio).ThenByDescending(g=> g.totalPresupuesto)

                   .ToList();
            ***REMOVED***
                else ***REMOVED***
                    objReturn = query2.ToList();


            ***REMOVED***

                
        ***REMOVED***
            return objReturn;
    ***REMOVED***



        public List<InfoPresupuesto> ObtenerClasificacion(int annio)
        ***REMOVED***
            List<InfoPresupuesto> objReturn = new List<InfoPresupuesto>();

         
                objReturn = (from pre in _connection.PresupuestoVigenteXSectorMinHaciendas
                             where pre.AnioPresupuesto == annio
                             group pre by new ***REMOVED*** pre.Clasificacion, pre.CodigoVersion, pre.AnioPresupuesto ***REMOVED*** into g
                             select new InfoPresupuesto ***REMOVED***
                                 totalClasificacion = (decimal)g.Sum(g => g.PresupuestoVigente),
                                 clasificacion =g.Key.Clasificacion,
                                 version=g.Key.CodigoVersion
                         ***REMOVED***).ToList();
            return objReturn;

    ***REMOVED***

        public List<InfoPresupuesto> ObtenerEntidad(int annio, string clasificacion)
        ***REMOVED***
            List<InfoPresupuesto> objReturn = new List<InfoPresupuesto>();


            objReturn = (from pre in _connection.PresupuestoVigenteXSectorMinHaciendas
                         where pre.AnioPresupuesto == annio && (pre.Clasificacion == clasificacion)
                         group pre by new ***REMOVED*** pre.NombreEntidad, pre.CodigoVersion, pre.AnioPresupuesto ***REMOVED*** into g
                         select new InfoPresupuesto ***REMOVED***
                             totalEntidad = (decimal)g.Sum(g => g.PresupuestoVigente),
                             entidad = g.Key.NombreEntidad,
                             version = g.Key.CodigoVersion
                     ***REMOVED***).ToList();

            return objReturn;

    ***REMOVED***
        public List<InfoPresupuesto> ObtenerClasePrograma(int annio, string clasificacion, string entidad)
        ***REMOVED***
            List<InfoPresupuesto> objReturn = new List<InfoPresupuesto>();


            objReturn = (from pre in _connection.PresupuestoVigenteXSectorMinHaciendas
                         where pre.AnioPresupuesto == annio && (pre.Clasificacion == clasificacion) && (pre.NombreEntidad == entidad)
                         group pre by new ***REMOVED*** pre.ClasePrograma, pre.CodigoVersion, pre.AnioPresupuesto ***REMOVED*** into g
                         select new InfoPresupuesto ***REMOVED***
                             totalClasePrograma = (decimal)g.Sum(g => g.PresupuestoVigente),
                             clasePrograma = g.Key.ClasePrograma,
                             version = g.Key.CodigoVersion
                     ***REMOVED***).ToList();

            return objReturn;

    ***REMOVED***



        public List<InfoPresupuesto> ObtenerProyectoActividades(int annio, string clasificacion, string entidad, string clasePrograma)
        ***REMOVED***
            List<InfoPresupuesto> objReturn = new List<InfoPresupuesto>();


            objReturn = (from pre in _connection.PresupuestoVigenteXSectorMinHaciendas
                         where pre.AnioPresupuesto == annio && (pre.Clasificacion == clasificacion)  && (pre.NombreEntidad == entidad) && (pre.ClasePrograma == clasePrograma)
                         group pre by new ***REMOVED*** pre.NombreProyectoActividad, pre.CodigoVersion, pre.AnioPresupuesto ***REMOVED*** into g
                         select new InfoPresupuesto ***REMOVED***
                             totalProyectoActividad = (decimal)g.Sum(g => g.PresupuestoVigente),
                             proyectoActividad = g.Key.NombreProyectoActividad,
                             version = g.Key.CodigoVersion
                     ***REMOVED***).ToList();

            return objReturn;

    ***REMOVED***

        public List<InfoPresupuesto> ObtenerVersiones(int annio)
        ***REMOVED***
            List<InfoPresupuesto> objReturn = new List<InfoPresupuesto>();


            objReturn = (from pre in _connection.PresupuestoXVersionMinHacientas
                         where pre.AnioPresupuesto == annio 
                         group pre by new ***REMOVED*** pre.AnioPresupuesto, pre.CodigoVersion, pre.NombreVersion ***REMOVED*** into g
                         select new InfoPresupuesto ***REMOVED***
                             nombreVersion= g.Key.NombreVersion,
                             version = (int)g.Key.CodigoVersion
                     ***REMOVED***).OrderBy(g => g.version).ToList();

            return objReturn;

    ***REMOVED***

        public List<InfoPresupuesto> ObtenerEntidadOG(int annio)
        ***REMOVED***
            List<InfoPresupuesto> objReturn = new List<InfoPresupuesto>();


            objReturn = (from pre in _connection.PresupuestoVigenteXSectorMinHaciendas
                         where pre.AnioPresupuesto == annio
                         group pre by new ***REMOVED*** pre.NombreEntidad, pre.CodigoVersion, pre.AnioPresupuesto ***REMOVED*** into g
                         select new InfoPresupuesto ***REMOVED***
                             totalEntidad = (decimal)g.Sum(g => g.PresupuestoVigente),
                             entidad = g.Key.NombreEntidad,
                             version = g.Key.CodigoVersion
                     ***REMOVED***).ToList();

            return objReturn;

    ***REMOVED***

        public List<InfoPresupuesto> ObtenerProyectoActividadesOG(int annio, string entidad)
        ***REMOVED***
            List<InfoPresupuesto> objReturn = new List<InfoPresupuesto>();


            objReturn = (from pre in _connection.PresupuestoVigenteXSectorMinHaciendas
                         where pre.AnioPresupuesto == annio && (pre.NombreEntidad == entidad) 
                         group pre by new ***REMOVED*** pre.NombreProyectoActividad, pre.CodigoVersion, pre.AnioPresupuesto ***REMOVED*** into g
                         select new InfoPresupuesto ***REMOVED***
                             totalProyectoActividad = (decimal)g.Sum(g => g.PresupuestoVigente),
                             proyectoActividad = g.Key.NombreProyectoActividad,
                             version = g.Key.CodigoVersion
                     ***REMOVED***).ToList();

            return objReturn;

    ***REMOVED***

        public List<InfoPresupuesto> ObtenerObjetoGasto(int annio, string entidad, string proyectoActividad)
        ***REMOVED***
            List<InfoPresupuesto> objReturn = new List<InfoPresupuesto>();


            objReturn = (from pre in _connection.PresupuestoVigenteXSectorMinHaciendas
                         where pre.AnioPresupuesto == annio && (pre.NombreEntidad == entidad) && (pre.NombreProyectoActividad == proyectoActividad)
                         group pre by new ***REMOVED*** pre.NombreObjetoGasto, pre.CodigoVersion, pre.AnioPresupuesto ***REMOVED*** into g
                         select new InfoPresupuesto ***REMOVED***
                             totalPresupuesto = (decimal)g.Sum(g => g.PresupuestoVigente),
                             labelGroup = g.Key.NombreObjetoGasto,
                             version = g.Key.CodigoVersion
                     ***REMOVED***).ToList();

            return objReturn;

    ***REMOVED***
***REMOVED***
***REMOVED***
