import React from 'react';
import { title } from 'case';
import { format } from 'date-fns';
import config from '../../util/config';
import addDays from 'date-fns/addDays';
import { extractDataFromEntity } from '../../util/extract-data';
import { useCrud } from '../providers/crud.provider';

const TableView = ({ roadmapId }) => {
	let startDate = null;
	let endDate;

	const crud = useCrud();
	const dataState = crud.dataState;

	const roadmaps = extractDataFromEntity('roadmap', dataState);
	const learnings = extractDataFromEntity('learning', dataState);
	const projects = extractDataFromEntity('project', dataState);
	const phases = extractDataFromEntity('phase', dataState);

	//learnings data for table
	const renderLearningData = (phaseId) => {
		const phaseLearnings = phases[phaseId]['learning'];
		return (
			<>
				<td className="px-6 py-4 whitespace-nowrap">
					{phaseLearnings.map((id) => (
						<p key={id} className="py-5 h-10 flex items-center">
							{learnings[id].title}
						</p>
					))}
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					{phaseLearnings.map((id) => (
						<p key={id} className="py-5 h-10 flex items-center">
							{learnings[id].category}
						</p>
					))}
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					{phaseLearnings.map((id) => (
						<p key={id} className="py-5 h-10 truncate max-w-xs flex items-center">
							<a className="overflow-ellipsis text-gray-500 underline" href={learnings[id].resources}>
								{learnings[id].resources}
							</a>
						</p>
					))}
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					{phaseLearnings.map((id) => (
						<p key={id} className="py-5 h-10 flex items-center">
							{learnings[id].priority}
						</p>
					))}
				</td>
			</>
		);
	};

	//calculate phase duration
	const calculatePhaseDuration = (phaseData) => {
		let phaseDuration = 0;
		let phaseIdProjects = phaseData[1];
		phaseIdProjects.forEach((id) => {
			let projectId = Object.keys(projects).find((projectID) => projectID === id);
			phaseDuration += Number(projects[projectId]['learningDay']) + Number(projects[projectId]['days']);
		});

		return phaseDuration;
	};

	//calculate ent date of phase
	const calculatePhaseEndDate = (date, duration) => {
		endDate = addDays(new Date(date), duration);
		return endDate;
	};

	//converting phaseData to table
	const renderPhaseData = (id, roadmap) => {
		const phaseId = Object.keys(phases).find((phaseID) => phaseID === id);

		if (startDate === null) {
			startDate = Object.values(roadmap)[1];
		} else {
			startDate = endDate;
		}

		return (
			<React.Fragment key={id}>
				<tr>
					<td className="px-6 whitespace-nowrap">{calculatePhaseDuration(Object.values(phases[phaseId]))} Days</td>
					{renderLearningData(phaseId)}
					<td className="px-6 py-4 whitespace-nowrap">
						<ul>
							{phases[phaseId]['project'].map((proj) => (
								<li className="py-5" key={proj}>
									{projects[proj].title}
								</li>
							))}
						</ul>
					</td>
				</tr>
				<tr>
					<td className="bg-gray-100 py-2 w-24">Evaluation</td>
					<td colSpan="5" className="bg-gray-100 py-2 w-24">
						{format(
							calculatePhaseEndDate(startDate, calculatePhaseDuration(Object.values(phases[phaseId]))),
							'EEEE d MMM yyyy',
						)}
					</td>
				</tr>
			</React.Fragment>
		);
	};

	return (
		<div className="flex">
			<div className="flex justify-center w-full flex-col">
				<table className="my-5 border-b border-gray-200 w-l">
					<thead className="bg-black w-full">
						<tr>
							{Object.keys(config.entities['roadmap'].readfields).map((field, index) => {
								return (
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
										key={index}>
										{title(field)}
									</th>
								);
							})}
						</tr>
					</thead>
					<tbody>
						{Object.values(roadmaps[roadmapId])[0]
							.map((Id) => {
								return renderPhaseData(Id, roadmaps[roadmapId]);
							})
							.filter(Boolean)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default TableView;
