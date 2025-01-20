
export class Entity{

    private state: string;
    private firstAttribute: number;
    private secondAttribute: number;

    constructor(props: any){
        this.firstAttribute = props.firstAttribute;
        this.secondAttribute = props.secondAttribute;
        this.state = props.state;
    }


    // validation and bussiness logic for the entity

    public isAllowed(){
        return this.state !== "LOCKED";
    }

    public getState(){
        return this.state;
    }

    public getFirstAttribute(){
        return this.firstAttribute;
    }

    public getSecondAttribute(){
        return this.secondAttribute;
    }


}