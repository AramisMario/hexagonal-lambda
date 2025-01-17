import { Utils } from "../../../utils/utils";
import { RequestDTO } from "../DTOs/RequestDTO";
import { ResponseDTO } from "../DTOs/ResponseDTO";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { HTTP_RESPONSES } from "../../../utils/constants";
import { UseCasePort } from "../../../application/ports/primaryPorts/useCases/useCasePort";
import { EntityPreconditionFailed } from "../../../domain/domainErrors/EntityErrors/EntityPreconditionFail";
import { dependenciesType } from "../../../application/useCases/useCase";
import { TransactionValidationFail } from "../../../domain/domainErrors/EntityErrors/TransactionValidationFail";
import { BodyMapper } from "../mappers/BodyMapper";
import { validate } from "class-validator";
export const apigatewayAdapter = (useCase: UseCasePort) => async (event:APIGatewayProxyEventV2,dependencies:dependenciesType) => {

    try{
        const body = JSON.parse(event.body as string);

        const requestDTO = BodyMapper.mapToDTO(body);

        const isValid = (await validate(requestDTO)).length > 0 ? false : true;

        if(!isValid){
            return Utils.response(
                400,
                HTTP_RESPONSES.BAD_REQUEST.code,
                HTTP_RESPONSES.BAD_REQUEST.message
            );
        }

        const result = await useCase.exec(requestDTO,dependencies);

        const responseData = new ResponseDTO(
            result.debitedAmount,
            result.cost
        );
        return Utils.response(
            HTTP_RESPONSES.SUCCESSFUL.httpCode,
            HTTP_RESPONSES.SUCCESSFUL.code,
            HTTP_RESPONSES.SUCCESSFUL.message,
            responseData
        );


    }catch(error){
        switch(error.code){
            case EntityPreconditionFailed.code:
                return Utils.response(
                    412,
                    EntityPreconditionFailed.code,
                    EntityPreconditionFailed.message
                );
            case TransactionValidationFail.code:
                return Utils.response(
                    412,
                    TransactionValidationFail.code,
                    TransactionValidationFail.message
                )
            default:
                return Utils.response(
                    HTTP_RESPONSES.INTERNAL_SERVER_ERROR.httpCode,
                    HTTP_RESPONSES.INTERNAL_SERVER_ERROR.code,
                    HTTP_RESPONSES.INTERNAL_SERVER_ERROR.message
                );
        }
    }

}