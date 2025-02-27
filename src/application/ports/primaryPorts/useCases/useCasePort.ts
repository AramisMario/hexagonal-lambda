import { dependenciesType } from "@useCases/useCase";
import { CaseData } from "@domain/models/caseData";

export interface UseCasePort{
    exec(data: CaseData, dependencies: dependenciesType): Promise<any>
}