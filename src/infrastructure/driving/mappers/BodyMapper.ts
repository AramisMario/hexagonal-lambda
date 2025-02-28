import { RequestDTO } from "@dtos/RequestDTO";

export class BodyMapper{

    static mapToDTO(body:any){

        // here we map the body into DTO format
        // its depends on the format of the data received you properly manage it to then map into DTO

        const { amount, account } = body;

        return new RequestDTO(
            account,
            amount
        );
    }

}