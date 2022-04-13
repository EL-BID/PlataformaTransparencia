﻿-- =============================================
-- Author:		<Carlos Mahecha>
-- Create date: <Julio 02 de 2013>
-- Description:	<Procedimiento para Obtener el listado de Tipos de Recurso>
-- =============================================
CREATE PROCEDURE [dbo].[ObtenerPinesProduccionPorMunicipioPorFiltros]
@IdRegion AS VARCHAR(10),
@IdDpto AS VARCHAR(10),
@IdMunicipio AS VARCHAR(10),
@IdRecurso AS VARCHAR(10),
@IdCampoOMina AS NVARCHAR(50),
@periodosList varchar(300),
@CuadradoVisualIntersectar geography
AS
BEGIN	

DECLARE @NombreCampoMina AS VARCHAR(250)

IF @IdCampoOMina <> ''
	BEGIN
	SELECT @NombreCampoMina = NombreCampoOProyecto FROM  CampoOProyecto(nolock) WHERE IdCampoOProyecto = @IdCampoOMina
	END

select  ente.IdMunicipio AS IdEntidad,
--ente.NombreMunicipio AS NombreEntidad,
CASE WHEN @IdCampoOMina <> '' THEN @NombreCampoMina + ' (' + ente.NombreMunicipio + ')'
	ELSE ente.NombreMunicipio
END AS  NombreEntidad,
cab.Latitud  AS Latitud,
cab.LONGITUD AS Longitud,
'/Produccion/FichaProduccion/?periodosProduccion='+ @periodosList + '&municipio=' + ente.IdMunicipio AS Url,
 UPPER(recurso.NombreRecursoNatural) AS NombreRecurso,
CONVERT(DECIMAL(18,0),SUM(ISNULL(prod.Produccion,0))) AS Cantidad,
unidad.NombreUnidadMedida AS UnidadDeMedida

FROM Produccion(nolock) prod
INNER JOIN EnteTerritorial(nolock) ente ON prod.IdMunicipio = ente.IdMunicipio
INNER JOIN RecursoNatural(nolock) recurso ON prod.IdRecursoNatural = recurso.IdRecursoNatural AND prod.IdTipoRecursoNatural = recurso.IdTipoRecursoNatural
INNER JOIN UnidadMedida(nolock) unidad ON prod.IdUnidadMedida = unidad.IdUnidadMedida
	INNER JOIN CabeceraMunicipio (nolock) cab ON prod.IdMunicipio = cab.CodigoDane
	WHERE (ente.IdRegion = @IdRegion OR @IdRegion =  '' OR @IdRegion IS NULL)
			AND (ente.IdDepartamento = @IdDpto OR @IdDpto = '' OR @IdDpto IS NULL )
			AND (ente.IdMunicipio = @IdMunicipio OR @IdMunicipio = ''  OR @IdMunicipio IS NULL)
			AND (prod.IdRecursoNatural = @IdRecurso OR @IdRecurso = '' OR @IdRecurso IS NULL OR @IdRecurso = '-1')
			AND (prod.IdCampoOProyecto = @IdCampoOMina OR @IdCampoOMina = '' OR @IdCampoOMina IS NULL )
			AND CHARINDEX( CONVERT(varchar(4), prod.AñoLiquidado) + ',' ,  @periodosList + ','	) > 0
			AND (@CuadradoVisualIntersectar.STIntersects(PuntoUbicacion)=1 OR @CuadradoVisualIntersectar IS NULL)	
			--AND prod.IdTipoDeContraprestacion = 1 --Regalias	
			
GROUP BY 
ente.IdMunicipio ,
ente.NombreMunicipio ,
cab.Latitud ,
cab.LONGITUD,
recurso.NombreRecursoNatural ,
unidad.NombreUnidadMedida 



END



