import { ThirdPartyApiCasePort } from "../ports/primaryPorts/useCases/thirdPartyApiCasePort";
import { ThirdPartyApiPort } from "../ports/secundaryPorts/thirdPartyApi/thirdPartyApiPort";

export type dependenciesType = {
    thirdPartyApi: ThirdPartyApiPort,
};
export class ThirdPartyApiCase implements ThirdPartyApiCasePort{
    async exec(data: any, dependencies: dependenciesType): Promise<any> {
        const { thirdPartyApi } = dependencies;
        return await thirdPartyApi.callThirdPartyAPI(data);
    }
}