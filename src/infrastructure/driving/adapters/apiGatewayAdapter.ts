import { Utils } from "../../../utils/utils";
import { RequestDTO } from "../DTOs/RequestDTO";
import { ResponseDTO } from "../DTOs/ResponseDTO";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { HTTP_RESPONSES } from "../../../utils/constants";
import { useCaseType } from "../../../application/useCases/useCase";
import { EntityPreconditionFailed } from "../../../domain/domainErrors/EntityErrors/EntityPreconditionFail";

export const apigatewayAdapter = (useCase: useCaseType) => async (event:APIGatewayProxyEventV2,dependencies:any) => {

    try{
        const body = JSON.parse(event.body as string);

        const requestDTO = new RequestDTO(
            body.account,
            body.amount
        );
        // agregar validaciones de body

        const result = await useCase(requestDTO,dependencies);

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
            default:
                return Utils.response(
                    HTTP_RESPONSES.INTERNAL_SERVER_ERROR.httpCode,
                    HTTP_RESPONSES.INTERNAL_SERVER_ERROR.code,
                    HTTP_RESPONSES.INTERNAL_SERVER_ERROR.message
                );
        }
    }

}