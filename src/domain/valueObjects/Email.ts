// IMPORTANT NOTE

// In some cases create a Value Object could increase complexity
// an alternative for Value Objects in Typescript is using types
// but the validation must be done outside the domain
// Use Value Objects when the object needs its own logic

export class Email{
    private email:string;

    constructor(email:string){
        this.email = email;
    }

    public validate(){

    }

    public getEmial(){
        return this.email;
    }
}