import { Utils } from "../../../utils/utils";
import { RequestDTO } from "../DTOs/RequestDTO";
import { ResponseDTO } from "../DTOs/ResponseDTO";
import { SQSEvent } from "aws-lambda";
import { HTTP_RESPONSES } from "../../../utils/constants";
import { UseCasePort } from "../../../application/ports/primaryPorts/useCases/useCasePort";
import { EntityPreconditionFailed } from "../../../domain/domainErrors/EntityErrors/EntityPreconditionFail";
import { dependenciesType } from "../../../application/useCases/useCase";
import { TransactionValidationFail } from "../../../domain/domainErrors/EntityErrors/TransactionValidationFail";
import { BodyMapper } from "../mappers/BodyMapper";
import { validate } from "class-validator";
export const sqsAdapter = (useCase: UseCasePort) => async (event:SQSEvent,dependencies:dependenciesType) => {

    const records = event.Records;
    const responses = [];
    for(const record of records){
        const requestDTO = BodyMapper.mapToDTO(record.body);
        const isValid = (await validate(requestDTO)).length > 0 ? false : true;

        if(!isValid){
            // use a logger to log the validation
        }

        const response = await useCase.exec(requestDTO,dependencies);
        responses.push(response);
    }

    return responses;
}