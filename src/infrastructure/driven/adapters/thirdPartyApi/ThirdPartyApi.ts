export class ThridPartyApiAdapter{

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