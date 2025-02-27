import { FindAccountCasePort } from "@primaryPorts/useCases/findAccountCasePort";
import { RepositoryPort } from "@secondaryPorts/repository/repositoryPort";
export type dependenciesType = {
    repository: RepositoryPort
};


export class FindAccountCase implements FindAccountCasePort{

    async exec(account: string, dependencies: dependenciesType): Promise<any>{

        const { repository } = dependencies;

        const entity = await repository.findByID(account);
        return entity;
        
    }

}