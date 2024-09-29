export class SqsQueue{
    private queueUrl: string;
    private SQS:any;
    constructor(queueUrl: string){
        this.queueUrl = queueUrl;
    }

    sendQueueMessage(){
        // codigo para enviar mensaje a la cola
    }

}