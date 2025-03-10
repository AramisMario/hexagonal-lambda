import { ThirdPartyApiPort } from "@secondaryPorts/thirdPartyApi/thirdPartyApiPort";
import { ThirdPartyApiErrorMapper } from "./thirdPartyErrorMapper/thirdPartyErrorMapper";
export class ThridPartyApiAdapter implements ThirdPartyApiPort{

    private url: string;
    private errorMapper: ThirdPartyApiErrorMapper
    constructor(url: string, errorMapper: ThirdPartyApiErrorMapper){
        this.url = url;
        this.errorMapper = errorMapper;
    }

    public async callThirdPartyAPI(data: object){
        try{
            return await fetch(this.url,{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
        }catch(error){
            //lag the error here
            this.errorMapper.setCode(error.code);
            throw this.errorMapper.map();
        }

    }
}