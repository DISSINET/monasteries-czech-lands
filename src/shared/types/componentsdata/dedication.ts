import { Time } from '..'
import { DictNameLanguages } from '../../dictionaries/name-languages'

const languageIds = DictNameLanguages.map((a) => a.id)
export type ComponentDataDedication = {
    value: string
    language: typeof languageIds[number]
    time: Time
}
