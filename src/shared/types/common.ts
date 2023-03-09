export type MutationResponse = {
    inserted: number
    replaced: number
    unchanged: number
    errors: number
    deleted: number
    skipped: number
    first_error: Error
    generated_keys: string[] // only for insert
}

export type ResponseData = {
    success: boolean
    message?: string
    values?: any
}

export type SignInResponse = {
    token?: string
}
