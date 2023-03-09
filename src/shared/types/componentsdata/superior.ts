import { Time } from '..'
import { DictSuperiorTypes } from '../../dictionaries/superior-types'

const superiorTypeIds = DictSuperiorTypes.map((a) => a.id)
export type ComponentDataSuperior = {
    name: string
    type: typeof superiorTypeIds[number]
    time: Time
}
