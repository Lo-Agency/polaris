import { React, useState, useEffect, useCallback } from 'react';
import { Gantt } from 'gantt-task-react';
import { extractDataFromEntity } from '../../util/extract-data';
import addDays from 'date-fns/addDays';
import GanttModal from '../molecules/gantt-chart-modal';
import 'gantt-task-react/dist/index.css';
import { useCrud } from '../providers/crud.provider';

const GanttChart = ({ roadmapId }) => {
	const crud = useCrud();
	const dataState = crud.dataState;

	const ganttData = [];
	const [tasks, setTasks] = useState(ganttData);
	const [view, setView] = useState('Month');
	const [project, setProject] = useState(null);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		setTasks(ganttData);
	}, [roadmapId]);

	let phaseStartDate = null;
	let projectStartDate = null;

	let phaseEndDate;
	let projectEndDate;

	let phasesEndDates = [];
	let projectsEndDates = [];

	let phasesStartDates = [];
	let projectsStartDates = [];

	const roadmaps = extractDataFromEntity('roadmap', dataState);
	const projects = extractDataFromEntity('project', dataState);
	const phases = extractDataFromEntity('phase', dataState);

	let columnWidth = 60;
	if (view === 'Month') {
		columnWidth = 200;
	} else if (view === 'Week') {
		columnWidth = 150;
	}

	const phasesId = roadmaps && roadmapId && roadmaps[roadmapId]['phase'];

	const calculatePhaseDuration = (phaseData) => {
		let phaseProjects = phaseData[1];
		let phaseDuration = 0;
		phaseProjects.forEach((id) => {
			let projectId = Object.keys(projects).find((projectID) => projectID === id);
			phaseDuration += Number(projects[projectId]['learningDay']) + Number(projects[projectId]['days']);
		});

		return phaseDuration;
	};

	const createStartEndProject = (roadmap, projectDuration) => {
		if (projectStartDate === null) {
			projectStartDate = Object.values(roadmap)[1];
		} else {
			projectStartDate = projectEndDate;
		}

		const projectEndDates = calculateProjectEndDate(projectStartDate, projectDuration);
		return [new Date(projectStartDate), projectEndDates];
	};

	const calculateProjectDuration = (phaseProjects, roadmap) => {
		const startDates = [];
		const endDates = [];
		phaseProjects.forEach((projectId) => {
			let projectDuration = Number(projects[projectId]['learningDay']) + Number(projects[projectId]['days']);
			const projectStartDates = createStartEndProject(roadmap, projectDuration);
			startDates.push(projectStartDates[0]);
			endDates.push(projectStartDates[1]);
		});

		return [startDates, endDates];
	};

	const calculatePhaseEndDate = (startDate, duration) => {
		phaseEndDate = addDays(new Date(startDate), duration);
		return phaseEndDate;
	};

	const calculateProjectEndDate = (startDate, duration) => {
		projectEndDate = addDays(new Date(startDate), duration);
		return projectEndDate;
	};

	const renderPhaseData = (id, roadmap) => {
		const phaseId = Object.keys(phases).find((phaseID) => phaseID === id);

		if (phaseStartDate === null) {
			phaseStartDate = Object.values(roadmap)[1];
		} else {
			phaseStartDate = phaseEndDate;
		}
		phasesStartDates.push(new Date(phaseStartDate));
		phasesEndDates.push(calculatePhaseEndDate(phaseStartDate, calculatePhaseDuration(Object.values(phases[phaseId]))));
		const phaseProjects = Object.values(phases[phaseId])[1];
		const startEndDates = calculateProjectDuration(phaseProjects, roadmap);
		projectsStartDates.push(startEndDates[0]);
		projectsEndDates.push(startEndDates[1]);
	};

	const handleExpanderClick = (selectedTask) => {
		setTasks(tasks.map((task) => (task.id === selectedTask.id ? selectedTask : task)));
	};

	const handleShowModal = useCallback(() => {
		setShowModal(!showModal);
	}, [showModal]);

	const handleCloseModal = useCallback(() => {
		setShowModal(false);
	}, []);

	const handleSelect = (task, isSelected) => {
		if (task.type === 'task' && isSelected) {
			setProject(projects[task.projectId]);
			handleShowModal();
		}
	};

	const getSelectedViewClassName = (viewMode) => {
		if (viewMode === view) {
			return 'btn m-2';
		} else {
			return 'bg-gray-300 text-black py-1 px-2 cursor-pointer hover:bg-gray-400 m-2';
		}
	};

	const createViewButtons = () => {
		return ['Day', 'Week', 'Month'].map((item) => {
			return (
				<button key={item} className={getSelectedViewClassName(item)} onClick={() => setView(item)}>
					{item}
				</button>
			);
		});
	};

	roadmapId &&
		Object.values(roadmaps[roadmapId])[0].map((phaseId) => {
			return renderPhaseData(phaseId, roadmaps[roadmapId]);
		});

	phasesId.forEach((phaseId, phaseIndex) => {
		//phases
		ganttData.push({
			id: phaseId,
			name: phases[phaseId]['title'],
			type: 'project',
			hideChildren: false,
			start: phasesStartDates[phaseIndex],
			end: phasesEndDates[phaseIndex],
		});

		//projects
		phases[phaseId]['project'].forEach((projectId, projectIndex) => {
			ganttData.push({
				//every id of projects must be unique in this gantt chart
				id: projectId + phaseId,
				name: projects[projectId]['title'],
				type: 'task',
				start: projectsStartDates[phaseIndex][projectIndex],
				end: projectsEndDates[phaseIndex][projectIndex],
				project: phaseId,
				projectId: projectId,
			});
		});
	});

	return (
		<>
			{createViewButtons()}
			<Gantt
				tasks={tasks}
				viewMode={view}
				onSelect={handleSelect}
				onExpanderClick={handleExpanderClick}
				columnWidth={columnWidth}
				fontFamily="inherit"
				projectBackgroundColor="#313638"
				projectBackgroundSelectedColor="#313638"
				todayColor="rgba(190, 190, 190, 0.5)"
				fontSize="1rem"
				barBackgroundColor="#BEBEBE"
				barBackgroundSelectedColor="#BEBEBE"
				barFill={70}
				barCornerRadius={0}
			/>
			{showModal && <GanttModal onCancel={handleCloseModal} project={project} />}
		</>
	);
};
export default GanttChart;
