import { BaseError } from "../../../utils/errors/BaseError";

export class EntityInvalidAddressError extends BaseError{

    static readonly code = 'INVALID_FIELD';
    static readonly message = 'Invalid Address';    
    
    constructor(){
        super(EntityInvalidAddressError.message, EntityInvalidAddressError.code);
    }
}