import React from 'react';
import { compareDesc, format } from 'date-fns';
import Charts from '../molecules/doughnut-chart-helper';
import { extractDataFromEntity } from '../../util/extract-data';
import addDays from 'date-fns/addDays';
import { useCrud } from '../providers/crud.provider';

const DoughnutChart = ({ selectedRoadmap }) => {
	const crud = useCrud();
	const dataState = crud.dataState;

	const roadmaps = extractDataFromEntity('roadmap', dataState);
	const phases = extractDataFromEntity('phase', dataState);
	const projects = extractDataFromEntity('project', dataState);

	let phaseProjectsName = [];
	let startDate = null;
	let endDate;
	let endDates = [];

	const renderPhaseData = (id, roadmap) => {
		const phaseId = Object.keys(phases).find((phaseID) => phaseID === id);
		if (startDate === null) {
			startDate = Object.values(roadmap)[1];
		} else {
			startDate = endDate;
		}
		endDates.push(calculatePhaseEndDate(startDate, calculatePhaseDuration(Object.values(phases[phaseId]))));
		phases[phaseId]['project'].forEach((projectId) => phaseProjectsName.push(projects[projectId]['title']));
	};

	//calculate ent date of phase
	const calculatePhaseEndDate = (date, duration) => {
		endDate = addDays(new Date(date), duration);
		return endDate;
	};
	//calculate phase duration
	const calculatePhaseDuration = (phaseData) => {
		let phaseDuration = 0;
		let projectsPhase = phaseData[1];
		projectsPhase.forEach((id) => {
			let projectId = Object.keys(projects).find((projectID) => projectID === id);
			phaseDuration += Number(projects[projectId]['learningDay']) + Number(projects[projectId]['days']);
		});

		return phaseDuration;
	};

	//This function gives the days between two different dates
	const calculateRoadmapDuration = (date, otherDate) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));

	return (
		<div className="flex justify-center mt-20">
			{Object.values(roadmaps[selectedRoadmap])[0]
				.map((phase) => {
					return renderPhaseData(phase, roadmaps[selectedRoadmap]);
				})
				.filter(Boolean)}

			{phaseProjectsName.length !== 0 && <Charts phaseProjects={phaseProjectsName} projectList={projects} />}

			<div className="self-center">
				{endDates.length !== 0 && compareDesc(new Date(endDates[endDates.length - 1]), new Date()) !== 1 && (
					<p className="text-black text-center m-4">
						This Roadmap ends on
						<span className="underline underline-offset-8">
							{' '}
							{format(new Date(endDates[endDates.length - 1]), 'PPP')}
						</span>
					</p>
				)}

				{endDates.length !== 0 && compareDesc(new Date(endDates[endDates.length - 1]), new Date()) !== 1 ? (
					<p className="text-black text-center m-4">
						{calculateRoadmapDuration(new Date(), new Date(endDates[endDates.length - 1]))} days are left
					</p>
				) : (
					endDates.length !== 0 && <p className="text-black m-4">This roadmap is finished</p>
				)}
			</div>
		</div>
	);
};
export default DoughnutChart;
