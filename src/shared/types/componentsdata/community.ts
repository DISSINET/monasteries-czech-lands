import { Time } from '..'
import { DictOrders, DictGenders } from '../../dictionaries'

const orderIds = DictOrders.map((a) => a.id)
const genderIds = DictGenders.map((a) => a.id)

export type ComponentDataCommunity = {
    order: typeof orderIds[number]
    gender: typeof genderIds[number]
    filiation: string
    time: Time
}
