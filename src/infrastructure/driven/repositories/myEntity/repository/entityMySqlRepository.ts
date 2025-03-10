import { RepositoryPort } from "@secondaryPorts/repository/repositoryPort";
import { TransactionValidationFail } from "@domainErrors/entityErrors/transactionValidationFail";
import { DATABASE_ERROR_CODES } from "@infrastructure/driven/repositories/myEntity/repository/errors/repositoryErrors";
import { EntityNotFoundError } from "@domainErrors/entityErrors/entityNotFound";
import { UnexpectedError } from "@domainErrors/generalErrors/unexpectedError";

export class EntityMysqlRepository implements RepositoryPort{


    async create(data:any): Promise<any>{

        try{

            // make your create and select query
    
            const createdRecord = {
                first: 12345678,
                second: 654245,
                state: "ACTIVE"
            }
    
            return createdRecord;
        }catch(error){
            // you could use a logging method here to regist the error code
            throw new UnexpectedError();
        }
    }

    async update(data:any): Promise<any>{
        try{
            // make your query
    
            const updatedRecord = {
                first: 12345678,
                second: 654245,
                state: "ACTIVE"
            }
            return updatedRecord;
        }catch(error){
            // handle database errors
            // you could use a logging method here to regist the error code
            throw new UnexpectedError();
        }
    }

    async findByID<T>(id: T): Promise<any>{
        try{
            // make your query

            const record = {
                first: 12345678,
                second: 654245,
                state: "ACTIVE"
            }

            return record;
        }catch(error){
            // you could use a logging method here to regist the error code
            throw new EntityNotFoundError();
        }
    }

    async delete(data: any): Promise<any>{
        try{
            // make your query
            const deletedRecord = {

            }
            return deletedRecord;

        }catch(error){
            // handle database errors
            // you could use a logging method here to regist the error code
            throw new EntityNotFoundError();
        }
    }

    async transaction(account: any, transactionType: string, amount: number): Promise<any> {

        try{

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
                case DATABASE_ERROR_CODES.TRANSACTION_VALIDATION_ERROR:
                    throw new TransactionValidationFail();
                default:
                    throw new EntityNotFoundError();
            }

        }
    }
}