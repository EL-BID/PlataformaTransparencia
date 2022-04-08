using System;
using SolrNet.Attributes;
using System.Collections.Generic;
using System.Text;

namespace PlataformaTransparencia.Modelos
***REMOVED***
    public class SolrResponse
    ***REMOVED***
        [SolrUniqueKey("id")]
        public string Id ***REMOVED*** get; set; ***REMOVED***
        [SolrField("principal")]
        public string Principal ***REMOVED*** get; set; ***REMOVED***
        [SolrField("metadata")]
        public string Metadata ***REMOVED*** get; set; ***REMOVED***
        [SolrField("descripcion")]
        public string Descripcion ***REMOVED*** get; set; ***REMOVED***
        [SolrField("IdSector")]
        public int IdSector ***REMOVED*** get; set; ***REMOVED***
        [SolrField("hierarchy")]
        public string Hierarchy ***REMOVED*** get; set; ***REMOVED***
        [SolrField("type")]
        public string Type ***REMOVED*** get; set; ***REMOVED***
        [SolrField("url")]
        public string Url ***REMOVED*** get; set; ***REMOVED***
        [SolrField("numFound")]
        public int numFound ***REMOVED*** get; set; ***REMOVED***


***REMOVED***
***REMOVED***