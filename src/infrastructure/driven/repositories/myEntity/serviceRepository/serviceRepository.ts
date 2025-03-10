import { RepositoryPort } from "@application/ports/secondaryPorts/repository/repositoryPort";
import { ServiceRepositoryPort } from "@application/ports/secondaryPorts/serviceRepository/serviceRepositoryPort";
import { Entity } from "@domain/entities/entity";
import { MyEntityMapper } from "@drivenMappers/myEntityMapper/myEntityMapper";

export class ServiceRepository implements ServiceRepositoryPort{

    private repository: RepositoryPort;
    private mapper: MyEntityMapper;
    constructor(repository:RepositoryPort, mapper:MyEntityMapper){
        this.repository = repository;
        this.mapper = mapper;
    }

    async findAccountById<T>(id: T): Promise<Entity> {
        try{
            
            const result = await this.repository.findByID(id);
            // you could add logic to apply to the data before to return it to the use case
            const entity = this.mapper.mapToEntity(result);
            return entity;
        }catch(error){
            // log error
            throw error;
        }
    }

    async createAccount(entity:Entity): Promise<Entity>{
        try{
            const data = this.mapper.mapToRepository(entity);
            const result = await this.repository.create(data);
            return this.mapper.mapToEntity(result);
        }catch(error){
            // log error
            throw error
        }
    }
    async updateAccount(entity:Entity): Promise<Entity>{
        try{
            const data = this.mapper.mapToRepository(entity);
            const result = await this.repository.update(data);
            return this.mapper.mapToEntity(result);

        }catch(error){
            // log error
            throw error;
        }
    }

    async deleteAccount(entity: Entity): Promise<any>{
        try{
            const data = this.mapper.mapToRepository(entity);
            return await this.repository.delete(data);
        }catch(error){
            // log error
            throw error
        }
    }

    async makeTransaction(entity: Entity, transactionType: string, amount: number): Promise<any>{
        try{
            const account  = this.mapper.mapToRepository(entity);
            return await this.repository.transaction(account.accountNumber,transactionType,amount);
        }catch(error){
            // log error
            throw error;
        }
    }

}