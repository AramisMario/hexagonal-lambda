import { BaseError } from "../BaseError/BaseError";

export class EntityPreconditionFailed extends BaseError{
    static readonly code = 'PRECONDITION_FAILED';
    static readonly message = 'Not meet the precondition';

    constructor(){
        super(EntityPreconditionFailed.message, EntityPreconditionFailed.code);
    }
}