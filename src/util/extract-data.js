import config from '../util/config';

export const extractDataFromEntity = (entityName, dataState) => {
	const entityData = dataState && dataState.filter((data) => Object.keys(data) == entityName);
	return entityData && entityData[0][entityName];
};

export const entityConfigFiels = (entityName) => {
	if (config.entities[entityName]) {
		return Object.keys(config.entities[entityName].fields);
	}
};
