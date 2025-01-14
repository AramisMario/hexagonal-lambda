import { TransactionCasePort } from "../ports/primaryPorts/useCases/transactionCasePort";
import { RepositoryPort } from "../ports/secundaryPorts/repository/repositoryPort";
import { Entity } from "../../domain/entities/Entity";
import { TransactionTypes } from "../../domain/types/Transactions";
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

        return await repository.transaction(account, TransactionTypes.DEBIT, amount);
    }

}