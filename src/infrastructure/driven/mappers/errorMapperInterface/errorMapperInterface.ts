export interface ErrorMapper{
    setCode(errorCode: string): void
    map(): Error
}