import { CaseData } from "../../domain/models/caseData";
import { SqsQueuePort } from "../ports/sqsQueue/sqsQueuePort";
import { RepositoryPort } from "../ports/repository/repositoryPort";
import { ThirdPartyApiPort } from "../ports/thirdPartyApi/thirdPartyApiPort";
import { EntityPreconditionFailed } from "../../domain/domainErrors/EntityErrors/EntityPreconditionFail";
export type dependenciesType = {
    thirdPartyApi: ThirdPartyApiPort,
    messageQueue: SqsQueuePort,
    repository: RepositoryPort
};

export type useCaseType = (data:CaseData, dependencies:dependenciesType) => Promise<any>;

export const useCase = ():useCaseType => async (data:CaseData, dependencies:dependenciesType) => {

    const { thirdPartyApi, messageQueue, repository } = dependencies;

    try{
        
        const entity = await repository.findByID(data.account);

        if(!entity.isAllowed()){
            throw new EntityPreconditionFailed();
        }

        entity.debit(data.amount);
        const result = await repository.update(entity);

        await thirdPartyApi.callThirdPartyAPI(data);
        await messageQueue.sendQueueMessage(result);

    }catch(error){
        // some logic needed to handle de error or using a logger
        throw error;
    }

}