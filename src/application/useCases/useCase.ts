import { RepositoryPort } from "../ports/repository/repositoryPort";
import { SqsQueuePort } from "../ports/sqsQueue/sqsQueuePort";
import { ThirdPartyApiPort } from "../ports/thirdPartyApi/thirdPartyApiPort";

export type dependenciesType = {
    thirdPartyApi: ThirdPartyApiPort,
    messageQueue: SqsQueuePort,
    repository: RepositoryPort
};

export type useCaseType = (data:any, dependencies:dependenciesType) => Promise<any>;

export const useCase = ():useCaseType => async (data:any, dependencies:dependenciesType) => {

    const { thirdPartyApi, messageQueue, repository } = dependencies;

    try{
        const resultApi = await thirdPartyApi.callThirdPartyAPI(data);
        const entity = await repository.findByID(resultApi.customNumber);

        if(!entity.isAllowed()){
            throw new Error("Not allowed");
        }

        entity.debit(data.amount);
        const result = await repository.update(entity);
        await messageQueue.sendQueueMessage(result);

    }catch(error){
        // some logic needed to handle de error or using a logger
        throw error;
    }

}