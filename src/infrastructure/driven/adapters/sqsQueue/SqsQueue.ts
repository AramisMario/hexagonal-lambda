import { SqsQueuePort } from "../../../../application/ports/secondaryPorts/sqsQueue/sqsQueuePort";
import { UnexpectedError } from "../../../../domain/domainErrors/generalErrors/unexpectedError";
const AWS = require("aws-sdk");

export class SqsQueue implements SqsQueuePort{
    private queueUrl: string;
    private SQS:any;
    constructor(queueUrl: string){
        this.queueUrl = queueUrl;
        this.SQS = new AWS.SQS({ apiVersion: "2012-11-05" });
    }

    async sendQueueMessage(data: object){
        try{
            return await this.SQS.sendMessage(data);
        }catch(error){
            throw new UnexpectedError();
        }
        
    }

}