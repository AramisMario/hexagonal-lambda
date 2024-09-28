// IMPORTANT NOTE

// In some cases create a Value Object could increase complexity
// an alternative for Value Objects in Typescript is using types
// but if you use a type the validation must be done outside the domain
// Use Value Objects when the object needs its own logic

export interface AddressProperties{
    country: string,
    state: string,
    city: string,
    postalCode: string,
    addres: string
}

export class Address{

    private country: string;
    private state: string;
    private city: string;
    private postalCode: string;
    private addres: string;

    constructor(address:AddressProperties){
        this.country = address.country;
        this.state = address.state;
        this.city = address.city;
        this.postalCode = address.postalCode;
        this.addres = address.addres;
    }

    // logic for validate de addres;
    public validate(){

    }

    public getFullAddress(){
        return `${this.addres}, ${this.city}, ${this.state}, ${this.country}, ${this.postalCode}`;
    }
}