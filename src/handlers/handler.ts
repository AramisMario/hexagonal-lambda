import { UseCase, dependenciesType } from "../application/useCases/useCase";
import { SqsQueue } from "../infrastructure/driven/adapters/sqsQueue/SqsQueue";
import { QUEUE_URL, THIRD_PARTY_URL } from "../utils/constants";
import { ThridPartyApiAdapter } from "../infrastructure/driven/adapters/thirdPartyApi/ThirdPartyApi";
import { EntityMysqlRepository } from "../infrastructure/driven/repositories/myEntityRepository/EntityMySqlRepository";
import { MyEntityMapper } from "../infrastructure/driven/mappers/myEntityMapper/MyEntityMapper";
import { APIGatewayProxyEventV2, EventBridgeEvent, SQSEvent } from "aws-lambda";
import { adapterFactory } from "../infrastructure/driving/factories/adapterFactory";

export const handler = async (event:APIGatewayProxyEventV2 | EventBridgeEvent<any,any> | SQSEvent) => {

    const useCase = new UseCase();

    const dependencies: dependenciesType = {
        thirdPartyApi: new ThridPartyApiAdapter(THIRD_PARTY_URL),
        messageQueue: new SqsQueue(QUEUE_URL),
        repository: new EntityMysqlRepository(new MyEntityMapper())
    }

    //@ts-ignore
    if (event.requestContext && event.requestContext) {
        return await adapterFactory("apigateway")(useCase)(event as APIGatewayProxyEventV2,dependencies); 
    } 
    //@ts-ignore
    if (event.source && event['detail-type']) {
        return await adapterFactory("eventBridge")(useCase)(event as EventBridgeEvent<any,any>,dependencies); 
    } 
    //@ts-ignore
    if (event.Records && event.Records[0].eventSource === 'aws:sqs') {
        return await adapterFactory("sqs")(useCase)(event as SQSEvent,dependencies); 
    }

    return "Unrecognized event source";

}