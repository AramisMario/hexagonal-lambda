import { BaseError } from "@domain/domainErrors/baseError/baseError";

export class TransactionValidationFail extends BaseError{
    
    static readonly code = 'TRANSACTION_VALIDATION_FAILED';        
    static readonly message = 'Fallo una validacion interna de la transaccion';

    constructor(){
        super(TransactionValidationFail.message, TransactionValidationFail.code);
    }

}