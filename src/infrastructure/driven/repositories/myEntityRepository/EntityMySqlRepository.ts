import { RepositoryPort } from "../../../../application/ports/repository/repositoryPort";
import { MyEntityMapper } from "../../mappers/myEntityMapper/MyEntityMapper";
import { Entity } from "../../../../domain/entities/Entity";
export class EntityMysqlRepository implements RepositoryPort{

    private mapper: MyEntityMapper;
    constructor(mapper:MyEntityMapper){
        this.mapper = mapper;
    }

    async create(data:any): Promise<Entity>{

        const insertData = this.mapper.mapToRepository(data);

        // make your create and select query

        const createdRecord = {
            first: 12345678,
            second: 654245,
            state: "ACTIVE"
        }

        return this.mapper.mapToEntity(createdRecord);
    }

    async update(entity:Entity): Promise<Entity>{
        const updateData = this.mapper.mapToRepository(entity);
        // make your query

        const updatedRecord = {
            first: 12345678,
            second: 654245,
            state: "ACTIVE"
        }
        return this.mapper.mapToEntity(updatedRecord);
    }

    async findByID<T>(id: T): Promise<Entity>{
        // make your query

        const record = {
            first: 12345678,
            second: 654245,
            state: "ACTIVE"
        }

        return this.mapper.mapToEntity(record);
    }

    async delete(entity: Entity): Promise<any>{
        // make your query
        return Promise.resolve(true);
    }
}