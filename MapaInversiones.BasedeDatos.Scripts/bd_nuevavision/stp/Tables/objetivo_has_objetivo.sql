﻿CREATE TABLE [stp].[objetivo_has_objetivo] (
    [objetivo_id]                   INT            NULL,
    [objetivo_tipo_objetivo_id]     INT            NULL,
    [objetivo_anho]                 INT            NULL,
    [objetivo_version]              INT            NULL,
    [objetivo_rel_id]               INT            NULL,
    [objetivo_rel_tipo_objetivo_id] INT            NULL,
    [objetivo_rel_anho]             INT            NULL,
    [objetivo_rel_version]          INT            NULL,
    [colaboracion]                  FLOAT (53)     NULL,
    [influencia]                    FLOAT (53)     NULL,
    [nivel]                         INT            NULL,
    [entidad]                       INT            NULL,
    [tipo_presupuesto]              INT            NULL,
    [programa]                      INT            NULL,
    [subprograma]                   INT            NULL,
    [proyecto]                      INT            NULL,
    [producto]                      INT            NULL,
    [unidad_responsable]            INT            NULL,
    [producto_concat]               NVARCHAR (MAX) NULL,
    [borrado]                       VARCHAR (5)    NULL,
    [fecha_actualizacion]           DATETIME2 (6)  NULL,
    [fecha_insercion]               DATETIME2 (6)  NULL,
    [usuario_responsable]           NVARCHAR (MAX) NULL
);
