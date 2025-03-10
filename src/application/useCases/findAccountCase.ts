import { ServiceRepositoryPort } from "@secondaryPorts/serviceRepository/serviceRepositoryPort";
import { FindAccountCasePort } from "@primaryPorts/useCases/findAccountCasePort";
export type dependenciesType = {
    serviceRepository: ServiceRepositoryPort
};


export class FindAccountCase implements FindAccountCasePort{

    async exec(account: string, dependencies: dependenciesType): Promise<any>{

        const { serviceRepository } = dependencies;

        try{
            const entity = await serviceRepository.findAccountById(account);
            return entity;
        }catch(error){
            // handle and log the error
            throw error;
        }

        
    }

}