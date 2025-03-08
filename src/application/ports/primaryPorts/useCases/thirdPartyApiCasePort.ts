import { dependenciesType } from "@useCases/thirdParyApiCase";
export interface ThirdPartyApiCasePort{
    exec(data: any, dependencies: dependenciesType): Promise<any>;
}