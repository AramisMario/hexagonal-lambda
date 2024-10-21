import { useCase } from "../../../application/useCases/useCase";
import { apigatewayAdapter } from "../adapters/apiGatewayAdapter";
import { SqsQueue } from "../../driven/adapters/sqsQueue/SqsQueue";
import { QUEUE_URL, THIRD_PARTY_URL } from "../../../utils/constants";
import { ThridPartyApiAdapter } from "../../driven/adapters/thirdPartyApi/thirdPartyApi";
import { EntityMysqlRepository } from "../../driven/repositories/myEntityRepository/EntityMySqlRepository";
import { MyEntityMapper } from "../../driven/mappers/myEntityMapper/MyEntityMapper";

export const handler = async (event:any) => {

    const dependencies = {
        thirdPartyApi: new ThridPartyApiAdapter(THIRD_PARTY_URL),
        messageQueue: new SqsQueue(QUEUE_URL),
        repository: new EntityMysqlRepository(new MyEntityMapper())
    }

    return await apigatewayAdapter(useCase())(event,dependencies);

}