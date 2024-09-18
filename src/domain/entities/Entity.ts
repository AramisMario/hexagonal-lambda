
export class Entity{

    private state: string;
    private firstAttribute: number;
    private secondAttribute: number;

    constructor(firstAttribute: number, secondAttribute: number, state:string){
        this.firstAttribute = firstAttribute;
        this.secondAttribute = secondAttribute;
        this.state = state;
    }

    public isAllowed(){
        return this.state !== "LOCKED";
    }

    public debit(amount: number){
        if(amount <= this.secondAttribute){
            this.firstAttribute = this.firstAttribute - amount;
        }
    }

}