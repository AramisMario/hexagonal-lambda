import { MessageCasePort } from "../ports/primaryPorts/useCases/messageCasePort";
import { SqsQueuePort } from "../ports/secondaryPorts/sqsQueue/sqsQueuePort";
export type dependenciesType = {
    messageQueue: SqsQueuePort,
}

export class MessageCase implements MessageCasePort{
    async sendMessage(message: any, dependencies: dependenciesType): Promise<any> {

        const { messageQueue } = dependencies;
        try{
            return await messageQueue.sendQueueMessage(message);
        }catch(error){
            // handle and log the error
            throw error;
        }
        
    }
}