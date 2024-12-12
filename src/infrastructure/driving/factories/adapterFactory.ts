import { sqsAdapter } from "../adapters/sqsAdapter";
import { apigatewayAdapter } from "../adapters/apiGatewayAdapter";
import { eventBridgeAdapter } from "../adapters/eventBridgeAdapter";

export const adapterFactory = (adapterType: string) => {

    const adapters = {
        apigateway: apigatewayAdapter,
        eventBridge: eventBridgeAdapter,
        sqs: sqsAdapter
    }

    return adapters[adapterType];
    
}