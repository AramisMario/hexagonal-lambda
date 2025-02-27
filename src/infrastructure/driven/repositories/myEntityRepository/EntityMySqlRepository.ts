import { RepositoryPort } from "../../../../application/ports/secondaryPorts/repository/repositoryPort";
import { MyEntityMapper } from "../../mappers/myEntityMapper/MyEntityMapper";
import { Entity } from "../../../../domain/entities/Entity";
import { TransactionValidationFail } from "../../../../domain/domainErrors/EntityErrors/TransactionValidationFail";
import { databaseErrorCodes } from "./repositoryErrors";
export class EntityMysqlRepository implements RepositoryPort{

    private mapper: MyEntityMapper;
    constructor(mapper:MyEntityMapper){
        this.mapper = mapper;
    }

    async create(data:any): Promise<Entity>{

        try{
            const insertData = this.mapper.mapToRepository(data);

            // make your create and select query
    
            const createdRecord = {
                first: 12345678,
                second: 654245,
                state: "ACTIVE"
            }
    
            return this.mapper.mapToEntity(createdRecord);
        }catch(error){
            // handle database errors
            // you could use a logging method here to regist the error code
            throw new Error("Send message acord to error");
        }
    }

    async update(entity:Entity): Promise<Entity>{
        try{
            const updateData = this.mapper.mapToRepository(entity);
            // make your query
    
            const updatedRecord = {
                first: 12345678,
                second: 654245,
                state: "ACTIVE"
            }
            return this.mapper.mapToEntity(updatedRecord);
        }catch(error){
            // handle database errors
            // you could use a logging method here to regist the error code
            throw new Error("Send message acord to error");
        }
    }

    async findByID<T>(id: T): Promise<Entity>{
        try{
            // make your query

            const record = {
                first: 12345678,
                second: 654245,
                state: "ACTIVE"
            }

            return this.mapper.mapToEntity(record);
        }catch(error){
            // handle database errors
            // you could use a logging method here to regist the error code
            throw new Error("Send message acord to error");
        }
    }

    async delete(entity: Entity): Promise<any>{
        try{
            // make your query
            return Promise.resolve(true);
        }catch(error){
            // handle database errors
            // you could use a logging method here to regist the error code
            throw new Error("Send message acord to error");
        }
    }

    async transaction(entity: Entity, transactionType: string, amount: number): Promise<any> {

        try{
            const account = this.mapper.mapToRepository(entity);

            // auto invoekd function to mock a transaction
            // you could use a logging method here to regist the error code
            const transactionResul =  await ((account) => {
                console.log(`Doing transaction ${transactionType} amount: ${amount} account: ${account}`);
                return {
                    debited: 1500,
                    cost: 0,
                }
            })(account);
    
            return transactionResul;
        }catch(error){

            // you could use a logging method here to regist the error code

            switch(error.code){
                case databaseErrorCodes.TRANSACTION_VALIDATION_ERROR:
                    throw new TransactionValidationFail();
                default:
                    throw new Error("Database internal error");
            }

        }
    }
}