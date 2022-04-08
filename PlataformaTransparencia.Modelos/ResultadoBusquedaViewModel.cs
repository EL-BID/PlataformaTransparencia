using System;
using System.Collections.Generic;
using System.Text;

namespace PlataformaTransparencia.Modelos
***REMOVED***
    public class ResultadoBusquedaViewModel
    ***REMOVED***
        public ResultadoBusquedaViewModel()
        ***REMOVED***
            ListaResultados = new List<ResultadoBusquedaItem>();
            ListaJerarquia = new List<HierarchyModel>();
    ***REMOVED***
        public List<ResultadoBusquedaItem> ListaResultados ***REMOVED*** get; set; ***REMOVED***

        public string CadenaBusqueda ***REMOVED*** get; set; ***REMOVED***
        public string Type ***REMOVED*** get; set; ***REMOVED***

        public int TotalResultados ***REMOVED*** get; set; ***REMOVED***

        public List<HierarchyModel> ListaJerarquia ***REMOVED*** get; set; ***REMOVED***

***REMOVED***

    public class HierarchyModel
    ***REMOVED***

        public HierarchyModel()
        ***REMOVED***
            ListaTipos = new List<TypeModel>();
    ***REMOVED***
        public string Hierarchy ***REMOVED*** get; set; ***REMOVED***

        public List<TypeModel> ListaTipos ***REMOVED*** get; set; ***REMOVED***

        public int TotalResultados ***REMOVED*** get; set; ***REMOVED***


***REMOVED***

    public class TypeModel
    ***REMOVED***
        public string Type ***REMOVED*** get; set; ***REMOVED***

        public int TotalResultados ***REMOVED*** get; set; ***REMOVED***

***REMOVED***
***REMOVED***
