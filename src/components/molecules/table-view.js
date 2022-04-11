import React from 'react';
import { title } from 'case';
import { format } from 'date-fns';
import config from '../../util/config';
import addDays from 'date-fns/addDays';
import { useCrud } from '../providers/crud.provider';
import { calculatePhaseDuration } from '../../util/extract-data';

const TableView = ({ roadmapId }) => {
	let startDate = null;
	let endDate;

	const crud = useCrud();
	const workspaceData = crud.curerntsharedroadmap;
	const roadmaps = workspaceData && workspaceData['roadmap'];
	const categories = workspaceData && workspaceData['lesson-category'];
	const lessons = workspaceData && workspaceData['lesson'];
	const targets = workspaceData && workspaceData['target'];
	const phases = workspaceData && workspaceData['phase'];

	// categories title for table
	const renderCategoriesData = (categoriesId) => {
		if (categoriesId) {
			const titles = categoriesId.map((id) => categories[id]['title']);
			return titles.join(', ');
		}
	};

	//lessons data for table
	const renderLearningData = (phaseId) => {
		const phaseTargets = phases[phaseId]['target'];
		let phaseLessons = [];
		phaseTargets.forEach((targetId) => {
			targets[targetId]['lesson'].forEach((id) => phaseLessons.push(id));
		});

		return (
			<>
				<td className="px-6 py-4 whitespace-nowrap">
					{phaseLessons.map((id) => (
						<p key={id} className="py-5 h-10 flex items-center">
							{lessons[id].title}
						</p>
					))}
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					{phaseLessons.map((id) => (
						<p key={id} className="py-5 h-10 flex items-center">
							{renderCategoriesData(lessons[id]['lesson-category'])}
						</p>
					))}
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					{phaseLessons.map((id) => (
						<p key={id} className="py-5 h-10 truncate max-w-xs flex items-center hover:text-gray-700">
							<a className="overflow-ellipsis text-gray-500 underline" href={lessons[id].resource}>
								{lessons[id].resource}
							</a>
						</p>
					))}
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					{phaseLessons.map((id) => (
						<p key={id} className="py-5 h-10 flex items-center">
							{lessons[id].priority}
						</p>
					))}
				</td>
			</>
		);
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
					<td className="px-6 whitespace-nowrap">
						{calculatePhaseDuration(Object.entries(phases[phaseId]), targets, lessons)} Days
					</td>
					{renderLearningData(phaseId)}
					<td className="px-6 py-4 whitespace-nowrap">
						<ul>
							{phases[phaseId]['target'].map((proj) => (
								<li className="py-5" key={proj}>
									{targets[proj].title}
								</li>
							))}
						</ul>
					</td>
				</tr>
				<tr>
					<td className="bg-gray-100 py-2 w-24 pl-4">Evaluation</td>
					<td colSpan="5" className="bg-gray-100 py-2 w-24">
						{format(
							calculatePhaseEndDate(
								startDate,
								calculatePhaseDuration(Object.entries(phases[phaseId]), targets, lessons),
							),
							'EEEE d MMM yyyy',
						)}
					</td>
				</tr>
			</React.Fragment>
		);
	};

	return (
		<div className="my-5 border-b mx-5 w-full border-gray-200 shadow-md">
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
