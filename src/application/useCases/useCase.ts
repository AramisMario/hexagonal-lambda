import { CaseData } from "../../domain/models/caseData";
import { SqsQueuePort } from "../ports/secundaryPorts/sqsQueue/sqsQueuePort";
import { TransactionTypes } from "../../domain/types/Transactions";
import { RepositoryPort } from "../ports/secundaryPorts/repository/repositoryPort";
import { DebitedSuccessful } from "../../domain/models/debitedSucess";
import { ThirdPartyApiPort } from "../ports/secundaryPorts/thirdPartyApi/thirdPartyApiPort";
import { EntityPreconditionFailed } from "../../domain/domainErrors/EntityErrors/EntityPreconditionFail";
import { UseCasePort } from "../ports/primaryPorts/useCase/useCasePort";

export type dependenciesType = {
    thirdPartyApi: ThirdPartyApiPort,
    messageQueue: SqsQueuePort,
    repository: RepositoryPort
};

export class UseCase implements UseCasePort{

    async exec(data: CaseData, dependencies: dependenciesType){
        const { thirdPartyApi, messageQueue, repository } = dependencies;

        try{
            
            const entity = await repository.findByID(data.account);
    
            if(!entity.isAllowed()){
                throw new EntityPreconditionFailed();
            }

            const result = await repository.transaction(entity,TransactionTypes.DEBIT,data.amount);
    
            await thirdPartyApi.callThirdPartyAPI(data);
            await messageQueue.sendQueueMessage(result);
    
            const response: DebitedSuccessful = {
                debitedAmount: result.debited,
                cost: result.cost
            }
    
            return response;
    
        }catch(error){
            
            // some logic needed to handle de error or using a logger
            throw error;
        }
    }
}