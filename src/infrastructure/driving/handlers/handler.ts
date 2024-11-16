import { UseCase, dependenciesType } from "../../../application/useCases/useCase";
import { apigatewayAdapter } from "../adapters/apiGatewayAdapter";
import { SqsQueue } from "../../driven/adapters/sqsQueue/SqsQueue";
import { QUEUE_URL, THIRD_PARTY_URL } from "../../../utils/constants";
import { ThridPartyApiAdapter } from "../../driven/adapters/thirdPartyApi/ThirdPartyApi";
import { EntityMysqlRepository } from "../../driven/repositories/myEntityRepository/EntityMySqlRepository";
import { MyEntityMapper } from "../../driven/mappers/myEntityMapper/MyEntityMapper";
import { APIGatewayProxyEventV2 } from "aws-lambda";

export const handler = async (event:APIGatewayProxyEventV2) => {

    const useCase = new UseCase();

    const dependencies: dependenciesType = {
        thirdPartyApi: new ThridPartyApiAdapter(THIRD_PARTY_URL),
        messageQueue: new SqsQueue(QUEUE_URL),
        repository: new EntityMysqlRepository(new MyEntityMapper())
    }

    return await apigatewayAdapter(useCase)(event,dependencies);

}