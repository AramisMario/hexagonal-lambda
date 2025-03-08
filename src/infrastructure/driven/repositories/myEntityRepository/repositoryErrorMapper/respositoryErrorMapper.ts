import { TransactionValidationFail } from "@domainErrors/EntityErrors/TransactionValidationFail";
import { UnexpectedError } from "@domainErrors/generalErrors/unexpectedError";
import { DATABASE_ERROR_CODES } from "@repositoryErrors/repositoryErrors";
import { ErrorMapper } from "@infrastructure/driven/mappers/errorMapperInterface/errorMapperInterface";
export class RepositoryErrorMapper implements ErrorMapper{


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