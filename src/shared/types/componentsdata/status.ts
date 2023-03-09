import { Time } from '..'

import { DictStatuses } from '../../dictionaries/statuses'

const statusIds = DictStatuses.map((a) => a.id)

export type ComponentDataStatus = {
    value: typeof statusIds[number]
    time: Time
}
