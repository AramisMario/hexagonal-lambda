import { Entity } from "@domain/entities/Entity";

export class MyEntityMapper{

    mapToRepository(entityProps: any){
        return{
            first: entityProps.frist,
            second: entityProps.second,
            state: entityProps.state
        }
    }

    mapToEntity(record: any){
        const props = {
            firstAttribute: record.first,
            secondAttribute: record.second,
            state: record.state
        };

        return new Entity(props);
    }

}