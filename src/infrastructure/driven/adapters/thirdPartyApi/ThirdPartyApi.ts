import { ThirdPartyApiPort } from "../../../../application/ports/secundaryPorts/thirdPartyApi/thirdPartyApiPort";
export class ThridPartyApiAdapter implements ThirdPartyApiPort{

    private url: string;

    constructor(url: string){
        this.url = url;
    }

    public async callThirdPartyAPI(data: object){
        return await fetch(this.url,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
    }
}