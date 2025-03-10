import { EventBridgeEvent } from "aws-lambda";
import { UseCasePort } from "@primaryPorts/useCases/useCasePort";
import { dependenciesType } from "@application/useCases/useCase";
import { BodyMapper } from "@drivingMappers/bodyMapper";
import { validate } from "class-validator";
import { EntityPreconditionFailed } from "@domainErrors/entityErrors/entityPreconditionFail";
import { TransactionValidationFail } from "@domainErrors/entityErrors/transactionValidationFail";
import { UnexpectedError } from "@domainErrors/generalErrors/unexpectedError";

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
            case UnexpectedError.code:
                    // log the error here and do what you need 
                break;
            default:
                    // log the error here and do what you need 
                break;
        }
    }

}