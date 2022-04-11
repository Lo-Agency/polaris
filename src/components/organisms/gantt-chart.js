import { React, useState, useEffect, useCallback } from 'react';
import { Gantt } from 'gantt-task-react';
import addDays from 'date-fns/addDays';
import GanttModal from '../molecules/gantt-chart-modal';
import 'gantt-task-react/dist/index.css';
import { useCrud } from '../providers/crud.provider';
import { calculateLessonsDuration, calculatePhaseDuration } from '../../util/extract-data';

const GanttChart = ({ roadmapId }) => {
	const crud = useCrud();
	const workspaceData = crud.curerntsharedroadmap;

	const ganttData = [];
	const [tasks, setTasks] = useState(ganttData);
	const [view, setView] = useState('Month');
	const [target, setTarget] = useState(null);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		setTasks(ganttData);
	}, [roadmapId]);

	let phaseStartDate = null;
	let targetStartDate = null;

	let phaseEndDate;
	let targetEndDate;

	let phasesEndDates = [];
	let targetsEndDates = [];

	let phasesStartDates = [];
	let targetsStartDates = [];

	const roadmaps = workspaceData['roadmap'];
	const targets = workspaceData['target'];
	const phases = workspaceData['phase'];
	const lessons = workspaceData['lesson'];

	let columnWidth = 60;
	if (view === 'Month') {
		columnWidth = 200;
	} else if (view === 'Week') {
		columnWidth = 150;
	}

	const phasesId = roadmaps && roadmapId && roadmaps[roadmapId]['phase'];

	const calculateStartEndTarget = (roadmap, targetDuration) => {
		if (targetStartDate === null) {
			targetStartDate = Object.values(roadmap)[1];
		} else {
			targetStartDate = targetEndDate;
		}

		const targetEndDates = calculateTargetEndDate(targetStartDate, targetDuration);
		return [new Date(targetStartDate), targetEndDates];
	};

	const calculateTargetDuration = (phasetargets, roadmap) => {
		const startDates = [];
		const endDates = [];
		phasetargets.forEach((targetId) => {
			let targetDuration =
				Number(targets[targetId]['duration']) + calculateLessonsDuration(targets[targetId]['lesson'], lessons);
			const targetStartDates = calculateStartEndTarget(roadmap, targetDuration);
			startDates.push(targetStartDates[0]);
			endDates.push(targetStartDates[1]);
		});

		return [startDates, endDates];
	};

	const calculatePhaseEndDate = (startDate, duration) => {
		phaseEndDate = addDays(new Date(startDate), duration);
		return phaseEndDate;
	};

	const calculateTargetEndDate = (startDate, duration) => {
		targetEndDate = addDays(new Date(startDate), duration);
		return targetEndDate;
	};

	const renderPhaseData = (id, roadmap) => {
		const phaseId = Object.keys(phases).find((phaseID) => phaseID === id);

		if (phaseStartDate === null) {
			phaseStartDate = Object.values(roadmap)[1];
		} else {
			phaseStartDate = phaseEndDate;
		}
		phasesStartDates.push(new Date(phaseStartDate));
		phasesEndDates.push(
			calculatePhaseEndDate(phaseStartDate, calculatePhaseDuration(Object.entries(phases[phaseId]), targets, lessons)),
		);
		const phasetargets = Object.values(phases[phaseId])[1];
		const startEndDates = calculateTargetDuration(phasetargets, roadmap);
		targetsStartDates.push(startEndDates[0]);
		targetsEndDates.push(startEndDates[1]);
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
			setTarget(targets[task.projectId]);
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

		//targets
		phases[phaseId]['target'].forEach((targetId, targetIndex) => {
			ganttData.push({
				//every id of targets must be unique in this gantt chart
				id: targetId + phaseId,
				name: targets[targetId]['title'],
				type: 'task',
				start: targetsStartDates[phaseIndex][targetIndex],
				end: targetsEndDates[phaseIndex][targetIndex],
				project: phaseId,
				projectId: targetId,
			});
		});
	});

	return (
		<div className="my-5 border-b mx-5 w-full border-gray-200 shadow-md">
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
			{showModal && <GanttModal onCancel={handleCloseModal} target={target} />}
		</div>
	);
};
export default GanttChart;
