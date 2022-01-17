import { React, useState } from "react";
import { ViewMode, Gantt } from "gantt-task-react";
import { ViewSwitcher } from "./view-switcher";
import "gantt-task-react/dist/index.css";
import { extractDataFromEntity } from '../../../util/extract-data';
import addDays from 'date-fns/addDays';
import { format } from 'date-fns';
//Init

const GanttChart = ({ roadmapId }) => {

  let starting = null;
  let endDate;
  let endingDats = [];
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


  const calculatePhaseEndDate = (starting, duration) => {
    endDate = addDays(new Date(starting), duration);
    return endDate;
  }
  // const renderPhaseData = (id, roadmap) => {

  //   const phaseId = Object.keys(phases).filter(phaseId => phaseId === id)
  //   { starting == null ? starting = (Object.values(roadmap))[1] : starting = endDate }
  //   endingDats.push(calculatePhaseEndDate(starting, calculatePhaseDuration(Object.values(phases[phaseId]))))
  //   phases[phaseId]["project"].forEach(projectId => phaseProjects.push(projects[projectId]["title"][0]))
  //   console.log(format(calculatePhaseEndDate(starting, calculatePhaseDuration(Object.values(phases[phaseId]))), "EEEE d MMM yyyy"));
  //   return (
  //     <React.Fragment key={id}>
  //       <tr>
  //         <td className="px-6 whitespace-nowrap">{calculatePhaseDuration(Object.values(phases[phaseId]))} Days</td>
  //         {renderLearningData(phaseId)}
  //         <td className="px-6 py-4 whitespace-nowrap">
  //           <ul >
  //             {phases[phaseId]["project"].map(proj => <li className="py-5 h-20" key={proj} >{(projects[proj]).title}</li>)}
  //           </ul>
  //         </td>
  //       </tr>
  //       <tr>
  //         <td className="bg-gray-100 py-2 w-24">Evaluation</td>
  //         <td colSpan="5" className="bg-gray-100 py-2 w-24"> {format(calculatePhaseEndDate(starting, calculatePhaseDuration(Object.values(phases[phaseId]))), "EEEE d MMM yyyy")}</td>

  //       </tr>
  //     </React.Fragment>
  //   )
  // }

  // array of phaseid of current roadmap ["id1","id2"]
  // {
  //   roadmapId && Object.values(roadmaps[roadmapId])[0]
  //     .map(phaseId => { return renderPhaseData(phaseId, roadmaps[roadmapId]) })

  // }


  // console.log("rrrr",roadmaps[roadmapId]);
  // phase: (2) ['-Mt1tpJIm3scIZ_FmLVk', '-Mt1ximN6KUVZvEXtokn']
  // startingDate: ['2022-01-13']
  // title: ['frontend']

  const currentDate = new Date();

  console.log("id of current phases", roadmapId && Object.values(roadmaps[roadmapId])[0]);


  // const taskphase = arrayofidphase.map(phaseid => ({ id: phaseid, name: phases[phaseid]["title"][0], type: "project", hideChildren: false }))
  // // add phases to the gantt chart array 

  // const taskproject = arrayofidphase.map(phaseid =>
  //   ({ id: phaseid, name: phases[phaseid]["title"][0], type: "project", hideChildren: false }))
  // ////////////////////

  const arrphase = []
  const arrproject = []

  console.log(roadmapId);
  const arrayofidphase = roadmaps && roadmapId && roadmaps[roadmapId]["phase"]
  console.log("ROADMAP",arrayofidphase);
  // console.log("ROADMAP",roadmaps);

  roadmaps && arrayofidphase.forEach(phaseid => {
    arrphase.push({ id: phaseid, name: phases[phaseid]["title"][0], type: "project", hideChildren: false })
    phases[phaseid]["project"].forEach(projectid => arrproject.push({ id: projectid, name: projects[projectid]["title"][0], type: "task", project: phaseid }))

  });

  console.log("arrproject", arrproject);
  console.log("arrphase", arrphase);







  const tasksarr = [

    {
      // start: new Date(roadmapId && (Object.values(roadmaps[roadmapId]))[1]),
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: "phase1",
      id: "phase1",
      type: "project",
      hideChildren: false
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: "project1",
      id: "phase 1 project 1",
      type: "task",
      project: "phase1"
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4, 0, 0),
      name: "project2",
      id: "phase 1 project 2",
      type: "task",
      project: "phase1"
    },
    //---
    {
      start: new Date(currentDate.getFullYear(), 2, 1),
      end: new Date(currentDate.getFullYear(), 2, 15),
      name: "phase2",
      id: "phase2",
      type: "project",
      hideChildren: false,
      isDisabled: true,
    },
    {
      start: new Date(currentDate.getFullYear(), 2, 1),
      end: new Date(currentDate.getFullYear(), 2, 10),
      name: "project1",
      id: "phase 2 project 1",
      type: "task",
      project: "phase2"
    },
    {
      start: new Date(currentDate.getFullYear(), 2, 10),
      end: new Date(currentDate.getFullYear(), 2, 15),
      name: "project2",
      id: "phase 2 project 2",
      type: "task",
      project: "phase2",

    }
  ];
  const [view, setView] = useState(ViewMode.Day);
  const [tasks, setTasks] = useState(tasksarr);
  const [isChecked, setIsChecked] = useState(true);
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
    <div>
      <ViewSwitcher
        onViewModeChange={(viewMode) => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />
      <h3>Roadmap</h3>
      <Gantt
        tasks={tasks}
        viewMode={view}
        // onDateChange={handleTaskChange}
        // onDelete={handleTaskDelete}
        // onProgressChange={handleProgressChange}
        onDoubleClick={handleDblClick}
        onSelect={handleSelect}
        onExpanderClick={handleExpanderClick}
        listCellWidth={isChecked ? "155px" : ""}
        columnWidth={columnWidth}
      />

    </div>
  );
};
export default GanttChart;
