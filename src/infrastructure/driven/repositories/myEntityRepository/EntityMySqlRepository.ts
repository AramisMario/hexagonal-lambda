import { RepositoryPort } from "../../../../application/ports/repository/repositoryPort";
export class EntityMysqlRepository implements RepositoryPort{
    async create(): Promise<any>{
        // make your query
        return Promise.resolve(true);
    }

    async update(): Promise<any>{
        // make your query
        return Promise.resolve(true);
    }

    async findByID<T>(id: T): Promise<any>{
        // make your query
        return Promise.resolve(true);
    }

    async delete(): Promise<any>{
        // make your query
        return Promise.resolve(true);
    }
}