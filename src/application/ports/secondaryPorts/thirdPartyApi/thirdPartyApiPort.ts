export interface ThirdPartyApiPort{
    callThirdPartyAPI(data: object): Promise<any>;
}