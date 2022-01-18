import { React, useState, useEffect } from "react";
import { ViewMode, Gantt } from "gantt-task-react";
import { ViewSwitcher } from "./view-switcher";
import "gantt-task-react/dist/index.css";
import { extractDataFromEntity } from '../../../util/extract-data';
import addDays from 'date-fns/addDays';

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
    ganttData.push({
      id: arrayofidphase[i],
      name: phases[arrayofidphase[i]]["title"][0],
      type: "project",
      hideChildren: false,
      end: endingDates[i],
      start: startingDates[i],
    })
    phases[arrayofidphase[i]]["project"].forEach(projectid =>
      ganttData.push({
        id: projectid + arrayofidphase[i], name: projects[projectid]["title"][0], type: "task",
        project: arrayofidphase[i],
        start: startingDatespro[i],
        end: endingDatespro[i]
      }))
  }

  const [view, setView] = useState(ViewMode.Month);
  const [tasks, setTasks] = useState(ganttData);

  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    setTasks(ganttData)
  }, [roadmapId]);


  let columnWidth = 60;
  if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }

  const handleDblClick = (task) => {
    alert("On Double Click event Id:" + task.id);
  };
  const handleSelect = (task, isSelected) => {
    console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
  };
  const handleExpanderClick = (task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    console.log("On expander click Id:" + task.id);
  };

  return (
    <>
      <ViewSwitcher
        onViewModeChange={(viewMode) => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />
      <Gantt
        tasks={tasks}
        viewMode={view}
        onDoubleClick={handleDblClick}
        onSelect={handleSelect}
        onExpanderClick={handleExpanderClick}
        listCellWidth={isChecked ? "155px" : ""}
        columnWidth={columnWidth}
      />
    </>
  );
};
export default GanttChart;
