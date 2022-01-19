import { React, useState, useEffect, useCallback } from "react";
import { ViewMode, Gantt } from "gantt-task-react";
import { ViewSwitcher } from "./view-switcher";
import "gantt-task-react/dist/index.css";
import { extractDataFromEntity } from '../../../util/extract-data';
import addDays from 'date-fns/addDays';
import GanttModal from './gantt-chart-modal'

const GanttChart = ({ roadmapId }) => {

  let starting = null;
  let startingpro = null;
  let endDate;
  let endDatepro;
  let endingDates = [];
  let endingDatespro = [];
  let startingDates = [];
  let startingDatespro = [];
  let phaseProjects = []

  const roadmaps = extractDataFromEntity("roadmap");
  const learnings = extractDataFromEntity("learning");
  const projects = extractDataFromEntity("project")
  const phases = extractDataFromEntity("phase");

  const calculatePhaseDuration = (phaseData) => {
    let phaseDuration = 0;
    for (let i = 0; i < (phaseData[1]).length; i++) {
      let projectId = Object.keys(projects).filter(id => id === phaseData[1][i]);
      phaseDuration += (Number(projects[projectId]["learningDay"]) + Number(projects[projectId]["days"]));
    }
    return phaseDuration;
  }

  const calculateProjectDuration = (phaseData, roadmap) => {
    for (let i = 0; i < (phaseData[1]).length; i++) {
      { startingpro == null ? startingpro = (Object.values(roadmap))[1] : startingpro = endDatepro }
      startingDatespro.push(new Date(startingpro))
      let projectId = Object.keys(projects).filter(id => id === phaseData[1][i]);
      let projectDuration = (Number(projects[projectId]["learningDay"]) + Number(projects[projectId]["days"]));
      endingDatespro.push(calculateProjectEndDate(startingpro, projectDuration))
    }
  }

  const calculatePhaseEndDate = (starting, duration) => {
    endDate = addDays(new Date(starting), duration);
    return endDate;
  }

  const calculateProjectEndDate = (starting, duration) => {
    endDatepro = addDays(new Date(starting), duration);
    return endDatepro;
  }

  /**
   * 
   * @param {phaseid} id 
   * @param {data of roadmaps[roadmapId] such as phase , starting date,titlej} roadmap 
   * @returns 
   */

  const renderPhaseData = (id, roadmap) => {
    const phaseId = Object.keys(phases).filter(phaseId => phaseId === id)
    { starting == null ? starting = (Object.values(roadmap))[1] : starting = endDate }
    startingDates.push(new Date(starting))
    calculateProjectDuration(Object.values(phases[phaseId]), roadmap)
    endingDates.push(calculatePhaseEndDate(starting, calculatePhaseDuration(Object.values(phases[phaseId]))))
    phases[phaseId]["project"].forEach(projectId => phaseProjects.push(projects[projectId]["title"][0]))
  }

  roadmapId && Object.values(roadmaps[roadmapId])[0]
    .map(phaseId => { return renderPhaseData(phaseId, roadmaps[roadmapId]) })


  const ganttData = []
  const arrayofidphase = roadmaps && roadmapId && roadmaps[roadmapId]["phase"]

  for (let i = 0; i < arrayofidphase.length; i++) {
    //phase
    ganttData.push({
      id: arrayofidphase[i],
      name: phases[arrayofidphase[i]]["title"][0],
      type: "project",
      hideChildren: false,
      end: endingDates[i],
      start: startingDates[i],
    })
    //project
    phases[arrayofidphase[i]]["project"].forEach(projectid =>
      ganttData.push({
        id: projectid + arrayofidphase[i], name: projects[projectid]["title"][0], type: "task",
        project: arrayofidphase[i],
        start: startingDatespro[i],
        end: endingDatespro[i],
        projectid: projectid,
      }))
  }

  const [view, setView] = useState(ViewMode.Month);
  const [tasks, setTasks] = useState(ganttData);
  const [isChecked, setIsChecked] = useState(true);
  const [project, setProject] = useState(null);

  useEffect(() => {
    setTasks(ganttData)
  }, [roadmapId]);

  let columnWidth = 60;
  if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }

  // const handleShowModal = (task) => {
  //   // alert("On Double Click event Id:" + task.id);
  //   // console.log(task);

  //       <Example />

  // };

  const handleExpanderClick = (task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  };
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal]);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleSelect = (task, isSelected) => {
    // console.log(projects[task.projectid]);
    setProject(projects[task.projectid])
    handleShowModal()
    // setTaskSelected(isSelected)
    // console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
  };

  // console.log(taskSelected);
  return (
    <>
      <ViewSwitcher

        onViewModeChange={(viewMode) => setView(viewMode)}
      // onViewListChange={setIsChecked}
      // isChecked={isChecked}
      />
      <h1>Roadmap</h1>
      <h1>click on each items on roadmap for further informations</h1>
      <Gantt
        tasks={tasks}
        viewMode={view}
        onSelect={handleSelect}
        onExpanderClick={handleExpanderClick}
        listCellWidth={isChecked ? "155px" : "90px"}
        columnWidth={columnWidth}
      />
      {showModal && <GanttModal onCancel={handleCloseModal} project={project} />}
    </>
  );
};
export default GanttChart;
