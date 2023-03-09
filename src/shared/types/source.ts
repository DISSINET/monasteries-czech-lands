import {
    ComponentGeo,
    Component,
    ComponentDataGeo,
    ComponentName,
    Time,
    Record as RecordModel,
} from './index'
import {
    DictReliabilities,
    DictNameLanguages,
    DictGenders,
    DictOrders,
    DictStatuses,
    DictSourceCategories,
} from '../dictionaries/index'
import { RecordLite } from './record'

const reliabilityIds = DictReliabilities.map((a) => a.id)

const categoryIds = DictSourceCategories.map((a) => a.id)
const languageIds = DictNameLanguages.map((a) => a.id)
const gendersIds = DictGenders.map((a) => a.id)
const ordersIds = DictOrders.map((a) => a.id)
const statusesIds = DictStatuses.map((a) => a.id)

export type Source = {
    id: string
    reliability: typeof reliabilityIds[number]
    label: string
    category: typeof categoryIds[number]
    url: string
    source: string
    licence: string
    region: string
    notes: string
    language: false | typeof languageIds[number]
    defaultGender: false | typeof gendersIds[number]
    defaultOrder: false | typeof ordersIds[number]
    defaultStatus: false | typeof statusesIds[number]
    limitTime: false | Time
    noRecords: number
}

export type SourcesGetResponse = {
    source: Source
    records_lite: RecordLite[]
}

export class SourcesFilterableInDb {
    created_at_from?: string
    created_at_to?: string
    updated_at_from?: string
    updated_at_to?: string
}

export class SourcesFilter extends SourcesFilterableInDb {
    localityName?: string
    geoXmin?: string
    geoXmax?: string
    geoYmin?: string
    geoYmax?: string
    componentName?: '1' | '0'
    componentGeo?: '1' | '0'
    componentCommunity?: '1' | '0'
    componentStatus?: '1' | '0'
    componentSuperior?: '1' | '0'
    componentFigure?: '1' | '0'
    componentDedication?: '1' | '0'
    componentEvent?: '1' | '0'
    componentReference?: '1' | '0'
}
