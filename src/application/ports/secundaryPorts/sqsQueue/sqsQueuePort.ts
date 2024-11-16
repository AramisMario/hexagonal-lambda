export interface SqsQueuePort{
    sendQueueMessage(data: object): Promise<any>
}