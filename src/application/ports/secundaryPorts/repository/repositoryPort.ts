import { Entity } from "../../../../domain/entities/Entity"
export interface RepositoryPort{
    create(data:any): Promise<Entity>
    update(entity:Entity): Promise<Entity>
    findByID<T>(id: T): Promise<Entity>
    delete(entity: Entity): Promise<any>
    transaction(entity: Entity, transactionType: string, amount: number): Promise<any>
}