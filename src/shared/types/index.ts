import { Source, SourcesFilter, SourcesFilterableInDb } from './source'
import { Record, RecordLite, RecordResponse } from './record'
import {
    Component,
    ComponentName,
    ComponentGeo,
    ComponentCommunity,
    ComponentStatus,
    ComponentFigure,
    ComponentSuperior,
    ComponentDedication,
    ComponentEvent,
    ComponentReference,
} from './component'
import { Time } from './time'
import { ComponentDataDedication } from './componentsdata/dedication'
import { ComponentDataGeo } from './componentsdata/geo'
import { ComponentDataName } from './componentsdata/name'
import { ComponentDataCommunity } from './componentsdata/community'
import { ComponentDataReference } from './componentsdata/reference'
import { ComponentDataStatus } from './componentsdata/status'
import { ComponentDataSuperior } from './componentsdata/superior'
import { MetasGetResponse } from './meta'
import { MutationResponse, ResponseData, SignInResponse } from './common'
import { Audit, auditedTables } from './audit'
import { JwtData } from './auth'
import { Monastery, MonasteryResponse } from './monastery'
import { ComponentDataFigure } from './componentsdata/figure'
import { ComponentDataEvent } from './componentsdata/event'

type ComponentData =
    | ComponentDataName
    | ComponentDataGeo
    | ComponentDataCommunity
    | ComponentDataStatus
    | ComponentDataSuperior
    | ComponentDataFigure
    | ComponentDataDedication
    | ComponentDataEvent
    | ComponentDataReference

export type {
    Source,
    SourcesFilter,
    SourcesFilterableInDb,
    Record,
    RecordLite,
    RecordResponse,
    Monastery,
    MonasteryResponse,
    Component,
    ComponentName,
    ComponentDataName,
    ComponentGeo,
    ComponentDataGeo,
    ComponentCommunity,
    ComponentDataCommunity,
    ComponentStatus,
    ComponentDataStatus,
    ComponentSuperior,
    ComponentDataSuperior,
    ComponentFigure,
    ComponentDataFigure,
    ComponentDedication,
    ComponentDataDedication,
    ComponentEvent,
    ComponentDataEvent,
    ComponentReference,
    ComponentDataReference,
    Time,
    ComponentData,
    Audit,
    JwtData,
    MetasGetResponse,
    ResponseData,
    MutationResponse,
    SignInResponse,
}

export { auditedTables }
