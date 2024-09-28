export class RequestDTO{
    public readonly account: string;
    public readonly amount: number;

    constructor(account: string, amount: number){
        this.account = account;
        this.amount = amount;
    }

}