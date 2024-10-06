export interface RepositoryPort{
    create(): Promise<any>
    update(): Promise<any>
    findByID<T>(id: T): Promise<any>
    delete(): Promise<any>
}