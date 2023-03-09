import { DictReferenceTypes } from '../../dictionaries/reference-types'

const referenceTypeIds = DictReferenceTypes.map((a) => a.id)

export type ComponentDataReference = {
    title: string
    url: string
    type: typeof referenceTypeIds[number]
}
