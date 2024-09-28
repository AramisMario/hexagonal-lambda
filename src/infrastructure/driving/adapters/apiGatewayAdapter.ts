import { RequestDTO } from "../DTOs/RequestDTO";
import { ResponseDTO } from "../DTOs/ResponseDTO";
export const apigatewayAdapter = (useCase: any) => async (event:any,dependencies:any) => {

    try{
        const body = event.body;

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