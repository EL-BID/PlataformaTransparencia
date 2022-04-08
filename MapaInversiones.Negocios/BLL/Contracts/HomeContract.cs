using System;
using System.Collections.Generic;
using System.Text;
using PlataformaTransparencia.Infrastructura.DataModels;
using PlataformaTransparencia.Modelos;
using PlataformaTransparencia.Negocios.Home;

namespace PlataformaTransparencia.Negocios.BLL.Contracts
***REMOVED***
    public class HomeContract : RespuestaContratoBase
    ***REMOVED***
        private readonly TransparenciaDB _connection;
        public ModelHomeData HomeModel ***REMOVED*** get; set; ***REMOVED***

        public HomeContract(TransparenciaDB connection)
        ***REMOVED***
            this.HomeModel = new ModelHomeData();
            _connection = connection;
    ***REMOVED***

        public void Fill(bool esHome = true)
        ***REMOVED***
            try ***REMOVED***

                ConsolidadosNacionalesBLL objNegocioConsolidados = new ConsolidadosNacionalesBLL(_connection);
                this.HomeModel = objNegocioConsolidados.ObtenerDatosModeloInicio(esHome);
                this.Status = true;

        ***REMOVED***
            catch (Exception ex) ***REMOVED***
                this.Status = false;
                this.Message = "Lo sentimos, ha ocurrido un error.";
        ***REMOVED***
    ***REMOVED***

***REMOVED***
***REMOVED***
