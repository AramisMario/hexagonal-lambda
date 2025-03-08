import { BaseError } from "../BaseError/BaseError";

export class UnexpectedError extends BaseError{
    static readonly code = 'UNEXPECTED_ERROR';
    static readonly message = 'Unexpected error';

    constructor(){
        super(UnexpectedError.message, UnexpectedError.code);
    }
}