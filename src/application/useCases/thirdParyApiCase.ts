import { ThirdPartyApiCasePort } from "@primaryPorts/useCases/thirdPartyApiCasePort";
import { ThirdPartyApiPort } from "@secondaryPorts/thirdPartyApi/thirdPartyApiPort";

export type dependenciesType = {
    thirdPartyApi: ThirdPartyApiPort,
};
export class ThirdPartyApiCase implements ThirdPartyApiCasePort{
    async exec(data: any, dependencies: dependenciesType): Promise<any> {
        const { thirdPartyApi } = dependencies;
        try{
            return await thirdPartyApi.callThirdPartyAPI(data);
        }catch(error){
            // handle and log the error
            throw error;
        }
    }
}