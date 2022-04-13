import React from 'react';
import { title } from 'case';
import { format, isAfter } from 'date-fns';
import config from '../../util/config';
import addDays from 'date-fns/addDays';
import { extractDataFromEntity } from '../../util/extract-data';
import { useCrud } from '../providers/crud.provider';

const TableView = ({ roadmapId }) => {
	let startDate = null;
	let endDate;

	const crud = useCrud();
	const dataState = crud.dataState;

	const categories = extractDataFromEntity('category', dataState);
	const roadmaps = extractDataFromEntity('roadmap', dataState);
	const learnings = extractDataFromEntity('learning', dataState);
	const projects = extractDataFromEntity('project', dataState);
	const phases = extractDataFromEntity('phase', dataState);

	// categories title for table
	const renderCategoriesData = (categoriesId) => {
		const titles = categoriesId.map((id) => categories[id]['title']);
		return titles.join(', ');
	};

	const renderPriorityIcon = (priority) => {
		console.log(priority);
		if (priority === 'High') {
			return (
				<svg className="w-6 h-6" fill="none" stroke="red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11l7-7 7 7M5 19l7-7 7 7"></path>
				</svg>
			);
		} else if (priority === 'Medium') {
			return (
				<svg className="w-6 h-6" fill="none" stroke="orange" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
				</svg>
			);
		} else {
			return (
				<svg className="w-6 h-6" fill="none" stroke="green" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
				</svg>
			);
		}
	};

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
							{renderCategoriesData(learnings[id].category)}
						</p>
					))}
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					{phaseLearnings.map((id) => (
						<p key={id} className="py-5 h-10 truncate max-w-xs flex items-center">
							<a
								className="overflow-ellipsis text-gray-500 underline hover:text-gray-700"
								href={learnings[id].resource}>
								{learnings[id].resource}
							</a>
						</p>
					))}
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					{phaseLearnings.map((id) => (
						<p key={id} className="py-5 h-10 flex items-center">
							{renderPriorityIcon(learnings[id].priority)}
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
		const today = new Date();

		return (
			<React.Fragment key={id}>
				{isAfter(today, new Date(startDate)) ? (
					<>
						<tr>
							<td className="px-6 whitespace-nowrap">{title(phases[phaseId]['title'])}</td>
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
							<td className="bg-gray-100 py-2 w-24 pl-4">Evaluation</td>
							<td colSpan="6" className="bg-gray-100 py-2 w-24">
								{format(
									calculatePhaseEndDate(startDate, calculatePhaseDuration(Object.values(phases[phaseId]))),
									'EEEE d MMM yyyy',
								)}
							</td>
						</tr>
					</>
				) : (
					<>
						<tr>
							<td colSpan="7" className=" w-12/12 h-32 text-center px-6 whitespace-nowrap">
								<div className="flex justify-center">
									<svg
										className="w-6 h-6 mr-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
									</svg>
									{title(phases[phaseId]['title'])}
								</div>
							</td>
						</tr>
						<tr>
							<td className="bg-gray-100 py-2 w-24 pl-4">Evaluation</td>
							<td colSpan="6" className="bg-gray-100 py-2 w-24">
								{format(
									calculatePhaseEndDate(startDate, calculatePhaseDuration(Object.values(phases[phaseId]))),
									'EEEE d MMM yyyy',
								)}
							</td>
						</tr>
					</>
				)}
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
