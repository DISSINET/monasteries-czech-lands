import { Time } from '..'
import { DictRoles, DictOccupations } from '../../dictionaries'

const rolesIds = DictRoles.map((a: any) => a.id)
const occupationIds = DictOccupations.map((a: any) => a.id)

export type ComponentDataFigure = {
    name: string
    role: typeof rolesIds[number]
    occupation: typeof occupationIds[number]
    time: Time
}
