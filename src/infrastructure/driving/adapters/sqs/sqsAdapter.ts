import { SQSEvent } from "aws-lambda";
import { UseCasePort } from "@primaryPorts/useCases/useCasePort";
import { dependenciesType } from "@application/useCases/useCase";
import { BodyMapper } from "@drivingMappers/BodyMapper";
import { validate } from "class-validator";
import { EntityPreconditionFailed } from "@domainErrors/EntityErrors/EntityPreconditionFail";
import { TransactionValidationFail } from "@domainErrors/EntityErrors/TransactionValidationFail";
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
                default:

                    // log the error here and do what you need

                    break;

            }
        }
    }
}