type BaseErrorAttributes = {
    code: string,
    message: string
}

export class BaseError extends Error{

    private code: string;

    constructor(message: string, code: string){
        super(message);
        this.code = code;
    }

    public getCode(): string{
        return this.code;
    }

    public getMessage(): string{
        return this.message;
    }

    public getError():BaseErrorAttributes{
        return {
            code: this.code,
            message: this.message
        }
    }

}