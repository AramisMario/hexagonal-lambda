import 'module-alias/register';
import { Utils } from "@utils/utils";
import { ResponseDTO } from "@dtos/ResponseDTO";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { HTTP_RESPONSES } from "@utils/constants";
import { UseCasePort } from "@primaryPorts/useCases/useCasePort";
import { EntityPreconditionFailed } from "@domainErrors/EntityErrors/EntityPreconditionFail";
import { dependenciesType } from "@application/useCases/useCase";
import { TransactionValidationFail } from "@domainErrors/EntityErrors/TransactionValidationFail";
import { BodyMapper } from "@drivingMappers/BodyMapper";
import { validate } from "class-validator";
import { UnexpectedError } from '../../../../domain/domainErrors/generalErrors/unexpectedError';
export const apigatewayAdapter = (useCase: UseCasePort) => async (event:APIGatewayProxyEventV2,dependencies:dependenciesType) => {

    try{
        const body = JSON.parse(event.body as string);

        const requestDTO = BodyMapper.mapToDTO(body);

        const isValid = (await validate(requestDTO)).length > 0 ? false : true;

        if(!isValid){
            // log the validation error
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
                // log the error here
                return Utils.response(
                    412,
                    EntityPreconditionFailed.code,
                    EntityPreconditionFailed.message
                );
            case TransactionValidationFail.code:
                // log the error here
                return Utils.response(
                    412,
                    TransactionValidationFail.code,
                    TransactionValidationFail.message
                )
            case UnexpectedError.code:
                // log the error here
                return Utils.response(
                    500,
                    UnexpectedError.code,
                    UnexpectedError.message
                )
            default:
                // log the error here
                return Utils.response(
                    500,
                    UnexpectedError.code,
                    UnexpectedError.message
                )
        }
    }

}