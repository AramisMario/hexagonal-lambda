import { EventBridgeEvent } from "aws-lambda";
import { UseCasePort } from "../../../../application/ports/primaryPorts/useCases/useCasePort";
import { dependenciesType } from "../../../../application/useCases/useCase";
import { BodyMapper } from "../../mappers/BodyMapper";
import { validate } from "class-validator";
import { EntityPreconditionFailed } from "../../../../domain/domainErrors/EntityErrors/EntityPreconditionFail";
import { TransactionValidationFail } from "../../../../domain/domainErrors/EntityErrors/TransactionValidationFail";
export const eventBridgeAdapter = (useCase: UseCasePort) => async (event:EventBridgeEvent<any,any>,dependencies:dependenciesType) => {

    try{
        const body = event.detail.body;

        const requestDTO = BodyMapper.mapToDTO(body);
        const isValid = (await validate(requestDTO)).length > 0 ? false : true;
    
        if(!isValid){
            // use a logger to log the validation
        }

        await useCase.exec(requestDTO,dependencies);
    }catch(error){
        switch(error.code){
            case EntityPreconditionFailed.code:
                    // log the error here and do what you need 
                break;
            case TransactionValidationFail.code:
                    // log the error here and do what you need 
                break;
            default:
                    // log the error here and do what you need 
                break;
        }
    }

}