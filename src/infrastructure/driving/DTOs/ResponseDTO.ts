export class ResponseDTO{
    public readonly debitedAmount: number;
    public readonly cost: number;

    constructor(debitedAmount: number, cost: number){
        this.debitedAmount = debitedAmount;
        this.cost = cost;
    }
}