﻿
CREATE VIEW [dbo].[VwLicitaciones] AS
SELECT [ID_Proyecto]
      ,[Codigo_BPIN]
      ,[URL]
      ,[NroLicitacion]
      ,[Objeto]
      ,[FechaPublicacion]
      ,[PresentacionOfertas]
      ,[FechaLimiteConsultas]
      ,[Beneficiarios]
      ,[AperturaOfertas]
      ,[Pregunta]
      ,[FechaLimiteParaContestar]
      ,[EstadoNombre]
      ,[EstadoPublicacionNombre]
      ,[CategoriaNombre]
      ,[LocalidadNombre]
      ,[Presupuesto]
  FROM [dbo].[Licitaciones]
