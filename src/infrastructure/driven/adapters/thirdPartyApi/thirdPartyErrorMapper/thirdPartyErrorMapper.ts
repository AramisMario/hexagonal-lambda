import { THIRD_PARTY_ERRORS } from "../errors/thirPartyErrors";
import { UnexpectedError } from "../../../../../domain/domainErrors/generalErrors/unexpectedError";
export class ThirdPartyApiErrorMapper{

    private errorCode: string;

    setCode(errorCode:string){
        this.errorCode = errorCode;
    }

    // in this case we map to the same error class but you map to the error you need in each case
    map(){
        switch (this.errorCode) {
            case THIRD_PARTY_ERRORS.SERVICE_UNAVAILABLE.code:
                return new UnexpectedError();
            case THIRD_PARTY_ERRORS.INTERNAL_SERVER_ERROR.code:
                return new UnexpectedError();
            case THIRD_PARTY_ERRORS.FORBIDDEN.code:
                return new UnexpectedError();
            default:
                return new UnexpectedError();
        }
    }

}