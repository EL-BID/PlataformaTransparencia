using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace PlataformaTransparencia.Modelos
***REMOVED***
    public abstract class RespuestaContratoBase
    ***REMOVED***
        /// <summary>
        /// Status 
        /// False si no.
        /// </summary>
        [JsonProperty(PropertyName = "status")]
        public bool Status ***REMOVED*** get; set; ***REMOVED***
        /// <summary>
        /// Mensaje de error en caso que se genere y la consulta retorne
        /// Falso
        /// </summary>
        [JsonProperty(PropertyName = "message")]
        public string Message ***REMOVED*** get; set; ***REMOVED***
***REMOVED***
***REMOVED***
