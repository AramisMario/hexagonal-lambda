import { UseCase, dependenciesType } from "@useCases/useCase";
import { SqsQueue } from "@infrastructure/driven/adapters/sqsQueue/sqsQueue";
import { QUEUE_URL, THIRD_PARTY_URL } from "@utils/constants";
import { ThridPartyApiAdapter } from "@infrastructure/driven/adapters/thirdPartyApi/thirdPartyApi";
import { EntityMysqlRepository } from "@infrastructure/driven/repositories/myEntity/repository/entityMySqlRepository";
import { MyEntityMapper } from "@infrastructure/driven/mappers/myEntityMapper/myEntityMapper";
import { APIGatewayProxyEventV2, EventBridgeEvent, SQSEvent } from "aws-lambda";
import { sqsAdapter } from "@drivingAdapters/sqs/sqsAdapter";
import { ServiceRepository } from '@infrastructure/driven/repositories/myEntity/serviceRepository/serviceRepository';

export const handler = async (event:APIGatewayProxyEventV2 | EventBridgeEvent<any,any> | SQSEvent) => {

    const useCase = new UseCase();

    const dependencies: dependenciesType = {
        thirdPartyApi: new ThridPartyApiAdapter(THIRD_PARTY_URL),
        messageQueue: new SqsQueue(QUEUE_URL),
        serviceRepository: new ServiceRepository(new EntityMysqlRepository(),new MyEntityMapper())
    }

    return await sqsAdapter(useCase)(event as SQSEvent,dependencies); 

}