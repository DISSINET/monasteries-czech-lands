export type Audit = {
    id?: string
    user_id: string
    model: 'records' | 'sources'
    model_id: string
    snapshot: any
    created_at: string
}

export const auditedTables = ['records', 'sources']
