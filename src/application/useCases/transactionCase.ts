import { TransactionCasePort } from "@primaryPorts/useCases/transactionCasePort";
import { RepositoryPort } from "@secondaryPorts/repository/repositoryPort";
import { Entity } from "@entities/entity";
import { TransactionTypes } from "@domain/types/transactions";
export type dependenciesType = {
    repository: RepositoryPort
};

export type dataType = {
    account: Entity, 
    amount: number
}


export class TransactionCase implements TransactionCasePort{

    async exec(data: dataType, dependencies: dependenciesType): Promise<any>{
        
        const { repository } = dependencies;
        const {account, amount} = data;

        try{
            return await repository.transaction(account, TransactionTypes.DEBIT, amount);
        }catch(error){
            // handle and log the error
            throw error;
        }
    }

}