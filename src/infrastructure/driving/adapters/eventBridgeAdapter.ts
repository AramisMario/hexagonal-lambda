import { Utils } from "../../../utils/utils";
import { RequestDTO } from "../DTOs/RequestDTO";
import { ResponseDTO } from "../DTOs/ResponseDTO";
import { EventBridgeEvent } from "aws-lambda";
import { HTTP_RESPONSES } from "../../../utils/constants";
import { UseCasePort } from "../../../application/ports/primaryPorts/useCase/useCasePort";
import { EntityPreconditionFailed } from "../../../domain/domainErrors/EntityErrors/EntityPreconditionFail";
import { dependenciesType } from "../../../application/useCases/useCase";
import { TransactionValidationFail } from "../../../domain/domainErrors/EntityErrors/TransactionValidationFail";
import { BodyMapper } from "../mappers/BodyMapper";
import { validate } from "class-validator";
export const eventBridgeAdapter = (useCase: UseCasePort) => async (event:EventBridgeEvent<any,any>,dependencies:dependenciesType) => {

    const body = event.detail.body;

    const requestDTO = BodyMapper.mapToDTO(body);
    const isValid = (await validate(requestDTO)).length > 0 ? false : true;

    if(!isValid){
        // use a logger to log the validation
    }

    await useCase.exec(requestDTO,dependencies);
}