import { BaseError } from "../BaseError/BaseError";

export class EntityNotFoundError extends BaseError{
    static readonly code = 'USER_ERROR';
    static readonly message = 'User not found';
    
    constructor(){
        super(EntityNotFoundError.message, EntityNotFoundError.code);
    }
}