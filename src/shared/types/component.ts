import { ComponentDataDedication } from './componentsdata/dedication'
import { ComponentDataGeo } from './componentsdata/geo'
import { ComponentDataEvent } from './componentsdata/event'
import { ComponentDataName } from './componentsdata/name'
import { ComponentDataCommunity } from './componentsdata/community'
import { ComponentDataReference } from './componentsdata/reference'
import { ComponentDataStatus } from './componentsdata/status'
import { ComponentDataSuperior } from './componentsdata/superior'
import { ComponentDataFigure } from './componentsdata/figure'

import { DictReliabilities } from '../dictionaries/reliabilities'
const reliabilityIds = DictReliabilities.map((a) => a.id)

import { DictCertainties } from '../dictionaries/certainties'
const certaintyIds = DictCertainties.map((a) => a.id)

import {
    DictComponentTypes,
    ComponentTypes,
} from '../dictionaries/component-types'
const typetIds = DictComponentTypes.map((a) => a.id)

import { DictComponentElvls } from '../dictionaries/component-elvls'
const elvlIds = DictComponentElvls.map((a) => a.id)

export interface Component {
    id: string
    data:
        | ComponentDataName
        | ComponentDataGeo
        | ComponentDataCommunity
        | ComponentDataStatus
        | ComponentDataSuperior
        | ComponentDataFigure
        | ComponentDataDedication
        | ComponentDataEvent
        | ComponentDataReference
    type: ComponentTypes
    certainty: typeof certaintyIds[number]
    elvl: typeof elvlIds[number]
    note: string
}

export interface ComponentName extends Component {
    id: string
    data: ComponentDataName
    type: ComponentTypes.NameComponent
    certainty: typeof certaintyIds[number]
    elvl: typeof elvlIds[number]
    note: string
}
export interface ComponentGeo extends Component {
    id: string
    data: ComponentDataGeo
    type: ComponentTypes.GeoComponent
    elvl: typeof elvlIds[number]
    note: string
}
export interface ComponentCommunity extends Component {
    id: string
    data: ComponentDataCommunity
    type: ComponentTypes.CommunityComponent
    certainty: typeof certaintyIds[number]
    elvl: typeof elvlIds[number]
    note: string
}
export interface ComponentStatus extends Component {
    id: string
    data: ComponentDataStatus
    type: ComponentTypes.StatusComponent
    certainty: typeof certaintyIds[number]
    elvl: typeof elvlIds[number]
    note: string
}
export interface ComponentSuperior extends Component {
    id: string
    data: ComponentDataSuperior
    type: ComponentTypes.SuperiorComponent
    certainty: typeof certaintyIds[number]
    elvl: typeof elvlIds[number]
    note: string
}
export interface ComponentFigure extends Component {
    id: string
    data: ComponentDataFigure
    type: ComponentTypes.FigureComponent
    certainty: typeof certaintyIds[number]
    elvl: typeof elvlIds[number]
    note: string
}
export interface ComponentDedication extends Component {
    id: string
    data: ComponentDataDedication
    type: ComponentTypes.DedicationComponent
    certainty: typeof certaintyIds[number]
    elvl: typeof elvlIds[number]
    note: string
}
export interface ComponentEvent extends Component {
    id: string
    data: ComponentDataEvent
    type: ComponentTypes.EventComponent
    certainty: typeof certaintyIds[number]
    elvl: typeof elvlIds[number]
    note: string
}
export interface ComponentReference extends Component {
    id: string
    data: ComponentDataReference
    type: ComponentTypes.ReferenceComponent
    note: string
}
