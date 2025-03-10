import { ResponseDTO } from "@infrastructure/driving/DTOs/responseDTO";

export class Utils{
    static response(httpCode: number, code:string, message: string, data?:ResponseDTO){
        
        const response:{
            httpCode: number,
            code: string,
            message: string,
            body?: string
        } = {
            httpCode,
            code,
            message
        }

        if(data) response.body = JSON.stringify(data);

        return response;

    }
}