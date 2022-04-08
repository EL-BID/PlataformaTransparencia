using System;
using System.Collections.Generic;
using System.Text;

namespace PlataformaTransparencia.Modelos
***REMOVED***
    public class InformationGraphics
    ***REMOVED***
        /// <summary>
        /// Descripcion del item que se va a sacar
        /// </summary>
        ///<remarks>Por ejemplo Nombre sector, Nombre recurso</remarks>
        ///
        public string labelGroup ***REMOVED*** get; set; ***REMOVED***
        public string label ***REMOVED*** get; set; ***REMOVED***
        public string label_inf ***REMOVED*** get; set; ***REMOVED***
        public string label_nivel4 ***REMOVED*** get; set; ***REMOVED***
        /// <summary>
        /// Porcentaje del item.
        /// </summary>
        public string value ***REMOVED*** get; set; ***REMOVED***
        /// <summary>
        /// Número de registros del item que se va a sacar
        /// </summary>
        public decimal rawValue ***REMOVED*** get; set; ***REMOVED***
        public decimal rawValue_asoc ***REMOVED*** get; set; ***REMOVED***
        public double rawValueDouble ***REMOVED*** get; set; ***REMOVED***
        public int rawValueInt ***REMOVED*** get; set; ***REMOVED***
        public decimal porcentaje ***REMOVED*** get; set; ***REMOVED***
***REMOVED***

    public class InfoRecursosEmergenciaPerObjeto : InformationGraphics
    ***REMOVED***

***REMOVED***

    public class InfoPresupuesto : InformationGraphics
    ***REMOVED***
        public decimal? totalGasto ***REMOVED*** get; set; ***REMOVED***
        public decimal? totalPresupuesto ***REMOVED*** get; set; ***REMOVED***
        public decimal? totalMH ***REMOVED*** get; set; ***REMOVED***
        public decimal? totalClasificacion ***REMOVED*** get; set; ***REMOVED***
        public decimal? totalClasePrograma ***REMOVED*** get; set; ***REMOVED***
        public decimal? totalEntidad ***REMOVED*** get; set; ***REMOVED***
        public decimal? totalProyectoActividad ***REMOVED*** get; set; ***REMOVED***
        public int annio ***REMOVED*** get; set; ***REMOVED***
        public string trimestre ***REMOVED*** get; set; ***REMOVED***
        public string clasificacion ***REMOVED*** get; set; ***REMOVED***
        public string entidad ***REMOVED*** get; set; ***REMOVED***
        public string clasePrograma ***REMOVED*** get; set; ***REMOVED***
        public string proyectoActividad ***REMOVED*** get; set; ***REMOVED***
        public int version ***REMOVED*** get; set; ***REMOVED***
        public string nombreVersion ***REMOVED*** get; set; ***REMOVED***


***REMOVED***

    public class InfoRecAsignadosPlan : InformationGraphics ***REMOVED*** 
       public int? periodo ***REMOVED*** get; set; ***REMOVED***
***REMOVED***

    public class InfoEntidadesConsolida : InformationGraphics
    ***REMOVED***
        public string id ***REMOVED*** get; set; ***REMOVED***

        public decimal asignado ***REMOVED*** get; set; ***REMOVED***

        public decimal avance ***REMOVED*** get; set; ***REMOVED***

        public double aporteObjetivo ***REMOVED*** get; set; ***REMOVED***
***REMOVED***
***REMOVED***
