import { TransactionValidationFail } from "../../../../../domain/domainErrors/EntityErrors/TransactionValidationFail";
import { UnexpectedError } from "../../../../../domain/domainErrors/generalErrors/unexpectedError";
import { DATABASE_ERROR_CODES } from "../errors/repositoryErrors";
export class RepositoryErrorMapper{


    private errorCode: string;

    setCode(errorCode:string){
        this.errorCode = errorCode;
    }

    map(){
        switch (this.errorCode) {
            case DATABASE_ERROR_CODES.TRANSACTION_VALIDATION_ERROR:
                return new TransactionValidationFail();
        
            default:
                return new UnexpectedError();
        }
    }

}