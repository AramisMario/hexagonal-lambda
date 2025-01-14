import { MessageCasePort } from "../ports/primaryPorts/useCases/messageCasePort";
import { SqsQueuePort } from "../ports/secundaryPorts/sqsQueue/sqsQueuePort";
export type dependenciesType = {
    messageQueue: SqsQueuePort,
}

export class MessageCase implements MessageCasePort{
    async sendMessage(message: any, dependencies: dependenciesType): Promise<any> {

        const { messageQueue } = dependencies;

        return await messageQueue.sendQueueMessage(message);
    }
}