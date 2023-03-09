import { DictGeoConfidences } from '../../dictionaries'

const confidenceIds = DictGeoConfidences.map((a: any) => a.id)

export type ComponentDataGeo = {
    x: number | false
    y: number | false
    confidence: typeof confidenceIds[number]
}
