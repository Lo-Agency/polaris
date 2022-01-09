import config from "../util/config";
import { useCrud } from "../components/providers/crud.provider";

export const extractDataFromEntity = (entityName) => {
    const crud = useCrud();
    const entityData = crud.dataState.filter(data => Object.keys(data) == entityName);
    return entityData[0][entityName]
}

export const extractEntityConfigFiels = (entityName) => {
    return Object.keys(config.entities[entityName].fields);
}