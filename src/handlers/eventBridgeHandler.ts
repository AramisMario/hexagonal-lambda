import { UseCase, dependenciesType } from "@useCases/useCase";
import { SqsQueue } from "@drivenAdapters/sqsQueue/SqsQueue";
import { QUEUE_URL, THIRD_PARTY_URL } from "../utils/constants";
import { ThridPartyApiAdapter } from "@drivenAdapters/thirdPartyApi/ThirdPartyApi";
import { EntityMysqlRepository } from "@infrastructure/driven/repositories/myEntityRepository/EntityMySqlRepository";
import { MyEntityMapper } from "@infrastructure/driven/mappers/myEntityMapper/MyEntityMapper";
import { EventBridgeEvent } from "aws-lambda";
import { eventBridgeAdapter } from "@drivingAdapters/eventBridge/eventBridgeAdapter";
export const handler = async (event: EventBridgeEvent<any,any>) => {

    const useCase = new UseCase();

    const dependencies: dependenciesType = {
        thirdPartyApi: new ThridPartyApiAdapter(THIRD_PARTY_URL),
        messageQueue: new SqsQueue(QUEUE_URL),
        repository: new EntityMysqlRepository(new MyEntityMapper())
    }

    return await eventBridgeAdapter(useCase)(event as EventBridgeEvent<any,any>,dependencies); 

}