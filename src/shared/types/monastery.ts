import { Record } from './record'
import { ComponentName, ComponentGeo } from './'

export type Monastery = {
    id: string
    name: string
    parent_id: string
    records?: Record[]
}

export type MonasteryResponse = Monastery & {
    score?: number
    closestName?: ComponentName
    closestGeo?: ComponentGeo
}
