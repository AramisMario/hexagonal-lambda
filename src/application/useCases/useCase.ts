import { CaseData } from "@models/caseData";
import { SqsQueuePort } from "@secondaryPorts/sqsQueue/sqsQueuePort";
import { DebitedSuccessful } from "@models/debitedSucess";
import { ThirdPartyApiPort } from "@secondaryPorts/thirdPartyApi/thirdPartyApiPort";
import { EntityPreconditionFailed } from "@domainErrors/entityErrors/entityPreconditionFail";
import { UseCasePort } from "@primaryPorts/useCases/useCasePort";
import { FindAccountCasePort } from "@primaryPorts/useCases/findAccountCasePort";
import { FindAccountCase } from "@useCases/findAccountCase";
import { TransactionCase } from "@useCases/transactionCase";
import { MessageCase } from "@useCases/messageCase";
import { ThirdPartyApiCase } from "@useCases/thirdParyApiCase";
import { ServiceRepositoryPort } from "@application/ports/secondaryPorts/serviceRepository/serviceRepositoryPort";

export type dependenciesType = {
    thirdPartyApi: ThirdPartyApiPort,
    messageQueue: SqsQueuePort,
    serviceRepository: ServiceRepositoryPort
};

export class UseCase implements UseCasePort{

    async exec(data: CaseData, dependencies: dependenciesType){
        const { thirdPartyApi, messageQueue, serviceRepository } = dependencies;

        try{

            const findAccount:FindAccountCasePort = new FindAccountCase();

            let account;
            try{
                account = await findAccount.exec(data.account, {serviceRepository});
            }catch(error){
                // log the error here and handle the error
                throw error;
            }

            if(!account.isAllowed()){
                throw new EntityPreconditionFailed();
            }

            let transactionResult;
            try{
                const transactionCase = new TransactionCase();
                transactionResult = await transactionCase.exec({account, amount: data.amount},{serviceRepository});
            }catch(error){
                // log the error here and handle the error
                throw error;
            }

            try{
                const thirparyApiCase = new ThirdPartyApiCase();
                thirparyApiCase.exec(transactionResult, {thirdPartyApi});
            }catch(error){
                // log the error here and handle the error
                throw error;
            }

            try{
                const messageCase = new MessageCase();
                messageCase.sendMessage(transactionResult,{messageQueue});
            }catch(error){
                // log the error here and handle the error
                throw error;
            }

            const response: DebitedSuccessful = {
                debitedAmount: transactionResult.debited,
                cost: transactionResult.cost
            }

            return response;

        }catch(error){
            // some logic needed to handle de error or using a logger
            throw error;
        }
    }
}