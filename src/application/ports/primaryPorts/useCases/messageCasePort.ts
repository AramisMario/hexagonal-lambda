import { dependenciesType } from "@useCases/messageCase";
export interface MessageCasePort{
    sendMessage(message: any, dependencies: dependenciesType): Promise<any>
}