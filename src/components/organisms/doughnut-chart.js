import React from 'react';
import { compareDesc, format } from 'date-fns';
import Charts from '../molecules/doughnut-chart-helper';
import { calculatePhaseDuration } from '../../util/extract-data';
import addDays from 'date-fns/addDays';
import { useCrud } from '../providers/crud.provider';

const DoughnutChart = ({ selectedRoadmap }) => {
	const crud = useCrud();
	const workspaceData = crud.curerntsharedroadmap;
	const roadmaps = workspaceData && workspaceData['roadmap'];
	const lessons = workspaceData && workspaceData['lesson'];
	const targets = workspaceData && workspaceData['target'];
	const phases = workspaceData && workspaceData['phase'];

	let phaseTargetsName = [];
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
		endDates.push(
			calculatePhaseEndDate(startDate, calculatePhaseDuration(Object.entries(phases[phaseId]), targets, lessons)),
		);
		phases[phaseId]['target'].forEach((targetId) => {
			phaseTargetsName.push(targets[targetId]['title']);
		});
	};

	//calculate ent date of phase
	const calculatePhaseEndDate = (date, duration) => {
		endDate = addDays(new Date(date), duration);
		return endDate;
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

			{phaseTargetsName.length !== 0 && (
				<Charts phaseTargets={phaseTargetsName} targetList={targets} lessons={lessons} />
			)}

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
