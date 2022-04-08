using System;
using SolrNet.Attributes;
using System.Collections.Generic;
using System.Text;

namespace PlataformaTransparencia.Modelos.Proyectos
***REMOVED***
    public class Proyecto
    ***REMOVED***
        [SolrUniqueKey("id")]
        public int Id ***REMOVED*** get; set; ***REMOVED***
        [SolrField("CodigoBPIN")]
        public List<string> CodigoBPIN ***REMOVED*** get; set; ***REMOVED***
        [SolrField("NombreProyecto")]
        public string NombreProyecto ***REMOVED*** get; set; ***REMOVED***
        [SolrField("FechaInicioProyecto")]
        public DateTime FechaInicioProyecto ***REMOVED*** get; set; ***REMOVED***
        [SolrField("FechaFinProyecto")]
        public DateTime FechaFinProyecto ***REMOVED*** get; set; ***REMOVED***
        [SolrField("ObjetivoGeneral")]
        public string ObjetivoGeneral ***REMOVED*** get; set; ***REMOVED***
        [SolrField("IdSector")]
        public int IdSector ***REMOVED*** get; set; ***REMOVED***
        [SolrField("Sector")]
        public string Sector ***REMOVED*** get; set; ***REMOVED***
        [SolrField("TipoDeProyecto")]
        public string TipoDeProyecto ***REMOVED*** get; set; ***REMOVED***
***REMOVED***
***REMOVED***
