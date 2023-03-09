import { DictNameLanguages } from '../../dictionaries/name-languages'
import { DictNameLengths } from '../../dictionaries/name-lenghts'
import { DictNameImportances } from '../../dictionaries/name-importances'

const languageIds = DictNameLanguages.map((a) => a.id)
const lengthIds = DictNameLengths.map((a) => a.id)
const importanceIds = DictNameImportances.map((a) => a.id)

export type ComponentDataName = {
    value: string
    length: typeof lengthIds[number]
    importance: typeof importanceIds[number]
    language: typeof languageIds[number]
}
