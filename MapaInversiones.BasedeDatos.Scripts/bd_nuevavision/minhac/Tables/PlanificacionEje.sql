﻿CREATE TABLE [minhac].[PlanificacionEje] (
    [ANIOPRESUP]            INT          NULL,
    [CodigoNivel]           INT          NULL,
    [CodigoEntidad]         INT          NULL,
    [CodigoTipo]            INT          NULL,
    [CodigoPrograma]        INT          NULL,
    [CodigoSubPrograma]     INT          NULL,
    [CodigoProyecto]        INT          NULL,
    [CodigoObjetoGasto]     INT          NULL,
    [CodigoClasifFuncional] INT          NOT NULL,
    [CodigoFuente]          INT          NULL,
    [PAI_CODIGO]            INT          NULL,
    [DPT_CODIGO]            INT          NULL,
    [APROBADO]              NUMERIC (15) NULL,
    [MODIFICA]              NUMERIC (15) NULL,
    [RESERVAS]              NUMERIC (15) NULL,
    [PREVISIONES]           FLOAT (53)   NULL,
    [COMPROMISOS]           FLOAT (53)   NULL,
    [PLAN_FIN]              FLOAT (53)   NULL,
    [RESERVAS_PF]           NUMERIC (15) NULL,
    [OBLIGADO]              FLOAT (53)   NULL,
    [PAGADO]                FLOAT (53)   NULL,
    [SALDO]                 FLOAT (53)   NULL,
    [SALDO_PF]              FLOAT (53)   NULL
);
