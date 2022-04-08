using System;
using System.Collections.Generic;
using System.Text;

namespace PlataformaTransparencia.Modelos.Plan
***REMOVED***
  public class ObjetivosGeneralPorEjeEstrategico
  ***REMOVED***
    public int Id ***REMOVED*** get; set; ***REMOVED*** // int
    public string Nombre ***REMOVED*** get; set; ***REMOVED*** // varchar(max)
    public string Descripcion ***REMOVED*** get; set; ***REMOVED*** // varchar(max)
    public List<ObjetivoEspecifico> ObjetivoEspecifico ***REMOVED*** get; set; ***REMOVED***
    public List<AlineacionOds> Ods ***REMOVED*** get; set; ***REMOVED***
  ***REMOVED***
  public class AlineacionOds
  ***REMOVED***
    public int? CodOds ***REMOVED*** get; set; ***REMOVED***
    public string Nombre ***REMOVED*** get; set; ***REMOVED***
  ***REMOVED***
***REMOVED***
