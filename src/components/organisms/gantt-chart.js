import { React, useState, useEffect, useCallback } from "react";
import { ViewMode, Gantt } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { extractDataFromEntity } from '../../util/extract-data';
import addDays from 'date-fns/addDays';
import GanttModal from '../molecules/gantt-chart-modal';

const GanttChart = ({ roadmapId }) => {

  const ganttData = []
  const [tasks, setTasks] = useState(ganttData);
  const [view, setView] = useState(ViewMode.Month);
  const [project, setProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setTasks(ganttData)
  }, [roadmapId]);

  let phaseStartDate = null;
  let projectStartDate = null;

  let phaseEndDate;
  let projectEndDate;

  let phasesEndDates = [];
  let projectsEndDates = [];

  let phasesStartDates = [];
  let projectsStartDates = [];

  const roadmaps = extractDataFromEntity("roadmap");
  const projects = extractDataFromEntity("project")
  const phases = extractDataFromEntity("phase");

  let columnWidth = 60;
  if (view === ViewMode.Month) {
    columnWidth = 200;
  } else if (view === ViewMode.Week) {
    columnWidth = 150;
  }

  const phasesId = roadmaps && roadmapId && roadmaps[roadmapId]["phase"]

  const calculatePhaseDuration = (phaseData) => {
    let phaseProjects = phaseData[1]
    let phaseDuration = 0;
    phaseProjects.forEach(id => {
      let projectId = Object.keys(projects).find(projectId => projectId === id);
      phaseDuration += (Number(projects[projectId]["learningDay"]) + Number(projects[projectId]["days"]));
    })

    return phaseDuration;
  }

  const createStartEndProject = (roadmap, projectDuration) => {
    if (projectStartDate == null) {
      projectStartDate = (Object.values(roadmap))[1]
    }
    else {
      projectStartDate = projectEndDate
    }

    const projectEndDates = calculateProjectEndDate(projectStartDate, projectDuration)
    return [new Date(projectStartDate), projectEndDates]
  }

  const calculateProjectDuration = (phaseProjects, roadmap) => {
    const startDates = []
    const endDates = []
    phaseProjects.forEach(projectId => {
      let projectDuration = (Number(projects[projectId]["learningDay"]) + Number(projects[projectId]["days"]));
      const projectStartDates = createStartEndProject(roadmap, projectDuration)
      startDates.push(projectStartDates[0])
      endDates.push(projectStartDates[1])
    })

    return [startDates, endDates]
  }

  const calculatePhaseEndDate = (starting, duration) => {
    phaseEndDate = addDays(new Date(starting), duration);
    return phaseEndDate;
  }

  const calculateProjectEndDate = (startDate, duration) => {
    projectEndDate = addDays(new Date(startDate), duration);
    return projectEndDate;
  }

  const renderPhaseData = (id, roadmap) => {
    const phaseId = Object.keys(phases).find(phaseId => phaseId === id)

    if (phaseStartDate == null) {
      phaseStartDate = (Object.values(roadmap))[1]
    }
    else {
      phaseStartDate = phaseEndDate
    }
    phasesStartDates.push(new Date(phaseStartDate))
    phasesEndDates.push(calculatePhaseEndDate(phaseStartDate, calculatePhaseDuration(Object.values(phases[phaseId]))))
    const phaseProjects = Object.values(phases[phaseId])[1]
    const startEndDates = calculateProjectDuration(phaseProjects, roadmap)
    projectsStartDates.push(startEndDates[0])
    projectsEndDates.push(startEndDates[1])
  }

  const handleExpanderClick = (task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  };

  const handleShowModal = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal]);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleSelect = (task, isSelected) => {
    if (task.type === "task" & isSelected) {
      setProject(projects[task.projectId])
      handleShowModal()
    }
  };

  roadmapId && Object.values(roadmaps[roadmapId])[0]
    .map(phaseId => { return renderPhaseData(phaseId, roadmaps[roadmapId]) })

  phasesId.forEach((phaseId, phaseIndex) => {
    //phases
    ganttData.push({
      id: phaseId,
      name: phases[phaseId]["title"][0],
      type: "project",
      hideChildren: false,
      start: phasesStartDates[phaseIndex],
      end: phasesEndDates[phaseIndex],
    })

    //projects
    phases[phaseId]["project"].forEach((projectId, projectIndex) => {
      ganttData.push({
        id: projectId + phaseId,
        name: projects[projectId]["title"][0],
        type: "task",
        start: projectsStartDates[phaseIndex][projectIndex],
        end: projectsEndDates[phaseIndex][projectIndex],
        project: phaseId,
        projectId: projectId,
      })
    });
  })

  return (
    <>
      {/* View switcher for gantt chart */}
      <div className="flex justify-start mb-2">
        <button className="btn" onClick={() => setView(ViewMode.Day)}>
          Day
        </button>
        <button
          className="btn"
          onClick={() => setView(ViewMode.Week)}
        >
          Week
        </button>
        <button
          className="btn"
          onClick={() => setView(ViewMode.Month)}
        >
          Month
        </button>
      </div>

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
