import { Entity } from "../../../../domain/entities/Entity";

export class MyEntityMapper{

    mapToRepository(entityProps: any){
        return{
            first: entityProps.frist,
            second: entityProps.second,
            state: entityProps.state
        }
    }

    mapToEntity(record: any){
        const firstAttribute = record.first;
        const secondAttribute = record.second;
        const state = record.state;

        return new Entity(
            firstAttribute,
            secondAttribute,
            state
        )
    }

}