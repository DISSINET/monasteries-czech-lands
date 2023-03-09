import { Component, Audit } from './index'
import { Monastery } from './monastery'

import { DictCertainties } from '../dictionaries/certainties'
import { ComponentTypes } from '../dictionaries/component-types'

const certaintyIds = DictCertainties.map((a) => a.id)

export type Record = {
    id: string
    source: string
    components: Component[]
    note: string
    created_at: string
    updated_at: string
    audits: Audit[]

    monastery_id: string | null

    monastery_link?: {
        certainty: typeof certaintyIds[number]
        note: string
    }
}

export type RecordResponse = {
    record: Record
    monastery?: Monastery
}

export type RecordLite = {
    id: string
    created_at: string
    updated_at: string
    name?: string
    has_name?: boolean
    has_geo?: boolean
    has_community?: boolean
    has_status?: boolean
    has_superior?: boolean
    has_figure?: boolean
    has_dedication?: boolean
    has_event?: boolean
    has_ref?: boolean
}

export function hasComponent(
    r: RecordLite,
    componentType: ComponentTypes
): boolean {
    switch (componentType) {
        case ComponentTypes.NameComponent:
            return r.has_name || false

        case ComponentTypes.GeoComponent:
            return r.has_geo || false

        case ComponentTypes.CommunityComponent:
            return r.has_community || false

        case ComponentTypes.StatusComponent:
            return r.has_status || false

        case ComponentTypes.SuperiorComponent:
            return r.has_superior || false

        case ComponentTypes.FigureComponent:
            return r.has_figure || false

        case ComponentTypes.DedicationComponent:
            return r.has_dedication || false

        case ComponentTypes.EventComponent:
            return r.has_event || false

        case ComponentTypes.ReferenceComponent:
            return r.has_ref || false
        default:
            throw new Error(
                `Bad type provided to HasComponent call: ${componentType}`
            )
    }
}
