import { Time } from '..'

import { DictEventTypes } from '../../dictionaries/event-types'

const eventTypeIds = DictEventTypes.map((a) => a.id)

export type ComponentDataEvent = {
    description: string
    type: typeof eventTypeIds[number]
    time: Time
}
