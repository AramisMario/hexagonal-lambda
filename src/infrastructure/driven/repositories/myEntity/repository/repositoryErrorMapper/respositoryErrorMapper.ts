import { TransactionValidationFail } from "@domainErrors/entityErrors/transactionValidationFail";
import { UnexpectedError } from "@domainErrors/generalErrors/unexpectedError";
import { DATABASE_ERROR_CODES } from "@infrastructure/driven/repositories/myEntity/repository/errors/repositoryErrors";
import { ErrorMapper } from "@drivenMappers/errorMapperInterface/errorMapperInterface";
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