using System;
using System.Collections.Generic;
using System.Text;
using SolrNet.Attributes;

namespace PlataformaTransparencia.Modelos
***REMOVED***
    public class ResultadoBusquedaItem
    ***REMOVED***
        [SolrUniqueKey("id")]
        public int Id ***REMOVED*** get; set; ***REMOVED***
        [SolrField("CodigoBPIN")]
        public List<string> CodigoBPIN ***REMOVED*** get; set; ***REMOVED***
        [SolrField("NombreProyecto")]
        public string NombreProyecto ***REMOVED*** get; set; ***REMOVED***
        [SolrField("IdSector")]
        public int IdSector ***REMOVED*** get; set; ***REMOVED***
        [SolrField("Sector")]
        public string Sector ***REMOVED*** get; set; ***REMOVED***
        [SolrField("Url")]
        public string Url ***REMOVED*** get; set; ***REMOVED***
        [SolrField("Type")]
        public string Type ***REMOVED*** get; set; ***REMOVED***
        [SolrField("numFound")]
        public int numFound ***REMOVED*** get; set; ***REMOVED***


***REMOVED***
***REMOVED***
