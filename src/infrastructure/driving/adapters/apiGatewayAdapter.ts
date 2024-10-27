import { RequestDTO } from "../DTOs/RequestDTO";
import { ResponseDTO } from "../DTOs/ResponseDTO";
import { useCaseType } from "../../../application/useCases/useCase";
import { APIGatewayProxyEventV2 } from "aws-lambda";

export const apigatewayAdapter = (useCase: useCaseType) => async (event:APIGatewayProxyEventV2,dependencies:any) => {

    try{
        const body = JSON.parse(event.body);

        const requestDTO = new RequestDTO(
            body.account,
            body.amount
        );
        // agregar validaciones de body

        const result = await useCase(requestDTO,dependencies);

        const response = new ResponseDTO(
            result.debitedAmount,
            result.cost
        );

        return {
            httpCode: 200,
            body: JSON.stringify(response)
        }

    }catch(error){

        return {
            httpCode: 500,
            code: "Internal Server error",
            message: "Error"
        }
    }

}