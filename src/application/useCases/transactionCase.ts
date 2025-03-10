import { TransactionCasePort } from "@primaryPorts/useCases/transactionCasePort";
import { RepositoryPort } from "@secondaryPorts/repository/repositoryPort";
import { Entity } from "@entities/entity";
import { TransactionTypes } from "@domain/types/transactions";
import { ServiceRepositoryPort } from "@application/ports/secondaryPorts/serviceRepository/serviceRepositoryPort";
export type dependenciesType = {
    serviceRepository: ServiceRepositoryPort
};

export type dataType = {
    account: Entity, 
    amount: number
}


export class TransactionCase implements TransactionCasePort{

    async exec(data: dataType, dependencies: dependenciesType): Promise<any>{
        
        const { serviceRepository } = dependencies;
        const { account, amount } = data;

        try{
            return await serviceRepository.makeTransaction(account, TransactionTypes.DEBIT, amount);
        }catch(error){
            // handle and log the error
            throw error;
        }
    }

}