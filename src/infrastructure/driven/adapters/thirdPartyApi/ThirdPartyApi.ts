import { ThirdPartyApiPort } from "../../../../application/ports/secondaryPorts/thirdPartyApi/thirdPartyApiPort";
export class ThridPartyApiAdapter implements ThirdPartyApiPort{

    private url: string;

    constructor(url: string){
        this.url = url;
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
            
        }

    }
}