import { Entity } from "@domain/entities/entity";
export interface ServiceRepositoryPort{
    createAccount(data:Entity): Promise<Entity>
    updateAccount(entity:Entity): Promise<Entity>
    findAccountById<T>(id: T): Promise<Entity>
    deleteAccount(data: Entity): Promise<any>
    makeTransaction(data: Entity, transactionType: string, amount: number): Promise<any>
}