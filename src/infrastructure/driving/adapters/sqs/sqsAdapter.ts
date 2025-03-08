import { SQSEvent } from "aws-lambda";
import { UseCasePort } from "../../../../application/ports/primaryPorts/useCases/useCasePort";
import { dependenciesType } from "../../../../application/useCases/useCase";
import { BodyMapper } from "../../mappers/BodyMapper";
import { validate } from "class-validator";
import { EntityPreconditionFailed } from "../../../../domain/domainErrors/EntityErrors/EntityPreconditionFail";
import { TransactionValidationFail } from "../../../../domain/domainErrors/EntityErrors/TransactionValidationFail";
import { UnexpectedError } from "../../../../domain/domainErrors/generalErrors/unexpectedError";
export const sqsAdapter = (useCase: UseCasePort) => async (event:SQSEvent,dependencies:dependenciesType) => {

    const records = event.Records;

    for(const record of records){
        try{
            const requestDTO = BodyMapper.mapToDTO(record.body);
            const isValid = (await validate(requestDTO)).length > 0 ? false : true;
    
            if(!isValid){
                // log the validation error
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
}