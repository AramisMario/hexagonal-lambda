export interface RepositoryPort{
    create(data:any): Promise<any>
    update(data:any): Promise<any>
    findByID<T>(id: T): Promise<any>
    delete(data: any): Promise<any>
    transaction(account: string, transactionType: string, amount: number): Promise<any>
}