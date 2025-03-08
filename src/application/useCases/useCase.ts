import { CaseData } from "@models/caseData";
import { SqsQueuePort } from "@secondaryPorts/sqsQueue/sqsQueuePort";
import { RepositoryPort } from "@secondaryPorts/repository/repositoryPort";
import { DebitedSuccessful } from "@models/debitedSucess";
import { ThirdPartyApiPort } from "@secondaryPorts/thirdPartyApi/thirdPartyApiPort";
import { EntityPreconditionFailed } from "@domainErrors/EntityErrors/EntityPreconditionFail";
import { UseCasePort } from "@primaryPorts/useCases/useCasePort";
import { FindAccountCasePort } from "@primaryPorts/useCases/findAccountCasePort";
import { FindAccountCase } from "@useCases/findAccountCase";
import { TransactionCase } from "@useCases/transactionCase";
import { MessageCase } from "@useCases/messageCase";
import { ThirdPartyApiCase } from "@useCases/thirdParyApiCase";

export type dependenciesType = {
    thirdPartyApi: ThirdPartyApiPort,
    messageQueue: SqsQueuePort,
    repository: RepositoryPort
};

export class UseCase implements UseCasePort{

    async exec(data: CaseData, dependencies: dependenciesType){
        const { thirdPartyApi, messageQueue, repository } = dependencies;

        try{

            const findAccount:FindAccountCasePort = new FindAccountCase();

            let account;
            try{
                account = await findAccount.exec(data.account, {repository});
            }catch(error){
                // log the error here
            }

            if(!account.isAllowed()){
                throw new EntityPreconditionFailed();
            }

            let transactionResult;
            try{
                const transactionCase = new TransactionCase();
                transactionResult = await transactionCase.exec({account, amount: data.amount},{repository});
            }catch(error){
                // log the error here
            }

            try{
                const thirparyApiCase = new ThirdPartyApiCase();
                thirparyApiCase.exec(transactionResult, {thirdPartyApi});
            }catch(error){
                // log the error here
            }

            try{
                const messageCase = new MessageCase();
                messageCase.sendMessage(transactionResult,{messageQueue});
            }catch(error){
                // log the error here
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