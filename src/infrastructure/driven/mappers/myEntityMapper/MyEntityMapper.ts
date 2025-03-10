import { Entity } from "@domain/entities/entity";

export class MyEntityMapper{

    mapToRepository(entity: Entity){
        return{
            first: entity.getFirstAttribute(),
            second: entity.getSecondAttribute(),
            state: entity.getState(),
            accountNumber: entity.getAccountNumber()
        }
    }

    mapToEntity(record: any): Entity{
        const props = {
            firstAttribute: record.first,
            secondAttribute: record.second,
            state: record.state
        };

        return new Entity(props);
    }

}