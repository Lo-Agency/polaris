import config from '../util/config';

export const calculateLessonsDuration = (projectLessons, lessons) => {
	let duration = 0;
	projectLessons.forEach((id) => {
		duration += Number(lessons[id]['duration']);
	});
	return duration;
};

export const calculatePhaseDuration = (phaseData, targets, lessons) => {
	let phaseDuration = 0;
	let phaseIdTargets = phaseData.filter((field) => field[0] === 'target');
	phaseIdTargets[0][1].forEach((id) => {
		let projectId = Object.keys(targets).find((projectID) => projectID === id);
		phaseDuration +=
			Number(targets[projectId]['duration']) + Number(calculateLessonsDuration(targets[projectId]['lesson'], lessons));
	});
	return phaseDuration;
};

export const entityConfigFiels = (entityName) => {
	if (config.entities[entityName]) {
		return Object.keys(config.entities[entityName].fields);
	}
};
