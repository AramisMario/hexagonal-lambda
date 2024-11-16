import { SqsQueuePort } from "../../../../application/ports/secundaryPorts/sqsQueue/sqsQueuePort";
export class SqsQueue implements SqsQueuePort{
    private queueUrl: string;
    private SQS:any;
    constructor(queueUrl: string){
        this.queueUrl = queueUrl;
    }

    sendQueueMessage(data: object){
        // codigo para enviar mensaje a la cola
        return Promise.resolve("messageId");
    }

}