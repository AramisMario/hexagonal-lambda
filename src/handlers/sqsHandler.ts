import { UseCase, dependenciesType } from "@application/useCases/useCase";
import { SqsQueue } from "../infrastructure/driven/adapters/sqsQueue/SqsQueue";
import { QUEUE_URL, THIRD_PARTY_URL } from "../utils/constants";
import { ThridPartyApiAdapter } from "../infrastructure/driven/adapters/thirdPartyApi/ThirdPartyApi";
import { EntityMysqlRepository } from "../infrastructure/driven/repositories/myEntityRepository/EntityMySqlRepository";
import { MyEntityMapper } from "../infrastructure/driven/mappers/myEntityMapper/MyEntityMapper";
import { APIGatewayProxyEventV2, EventBridgeEvent, SQSEvent } from "aws-lambda";
import { sqsAdapter } from "../infrastructure/driving/adapters/sqs/sqsAdapter";

export const handler = async (event:APIGatewayProxyEventV2 | EventBridgeEvent<any,any> | SQSEvent) => {

    const useCase = new UseCase();

    const dependencies: dependenciesType = {
        thirdPartyApi: new ThridPartyApiAdapter(THIRD_PARTY_URL),
        messageQueue: new SqsQueue(QUEUE_URL),
        repository: new EntityMysqlRepository(new MyEntityMapper())
    }

    return await sqsAdapter(useCase)(event as SQSEvent,dependencies); 

}