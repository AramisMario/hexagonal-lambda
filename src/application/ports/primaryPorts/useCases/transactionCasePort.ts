import { dataType } from "@useCases/transactionCase";
import { dependenciesType } from "@useCases/transactionCase";

export interface TransactionCasePort{
    exec(data: dataType, dependencies: dependenciesType): Promise<any>
}