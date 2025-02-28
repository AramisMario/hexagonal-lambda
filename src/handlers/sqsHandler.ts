import { UseCase, dependenciesType } from "@useCases/useCase";
import { SqsQueue } from "@drivenAdapters/sqsQueue/SqsQueue";
import { QUEUE_URL, THIRD_PARTY_URL } from "@utils/constants";
import { ThridPartyApiAdapter } from "@drivenAdapters/thirdPartyApi/ThirdPartyApi";
import { EntityMysqlRepository } from "@drivenRepositories/myEntityRepository/EntityMySqlRepository";
import { MyEntityMapper } from "@drivenMappers/myEntityMapper/MyEntityMapper";
import { APIGatewayProxyEventV2, EventBridgeEvent, SQSEvent } from "aws-lambda";
import { sqsAdapter } from "@drivingAdapters/sqs/sqsAdapter";

export const handler = async (event:APIGatewayProxyEventV2 | EventBridgeEvent<any,any> | SQSEvent) => {

    const useCase = new UseCase();

    const dependencies: dependenciesType = {
        thirdPartyApi: new ThridPartyApiAdapter(THIRD_PARTY_URL),
        messageQueue: new SqsQueue(QUEUE_URL),
        repository: new EntityMysqlRepository(new MyEntityMapper())
    }

    return await sqsAdapter(useCase)(event as SQSEvent,dependencies); 

}