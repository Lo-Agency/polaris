import { React, useState, useEffect, useCallback } from "react";
import { ViewMode, Gantt } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { extractDataFromEntity } from '../../util/extract-data';
import addDays from 'date-fns/addDays';
import GanttModal from '../molecules/gantt-chart-modal';

const GanttChart = ({ roadmapId }) => {

  let starting = null;
  let startingpro = null;
  let endDate;
  let endDatepro;
  let endingDates = [];
  let endingDatespro = [];
  let startingDates = [];
  let startingDatespro = [];

  const roadmaps = extractDataFromEntity("roadmap");
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
  /**
   * 
   * @param {Array oh phases =>[sss,kkkk]} phaseData 
   * @param {*} roadmap 
   */
  function test(roadmap, projectDuration) {
    { startingpro == null ? startingpro = (Object.values(roadmap))[1] : startingpro = endDatepro }
    const endarr = calculateProjectEndDate(startingpro, projectDuration)
    return [new Date(startingpro), endarr]
  }
  const calculateProjectDuration = (phaseData, roadmap) => {
    const arrstart = []
    const arrend = []
    for (let i = 0; i < (phaseData).length; i++) {
      let projectId = Object.keys(projects).filter(id => id === phaseData[i]);
      let projectDuration = (Number(projects[projectId]["learningDay"]) + Number(projects[projectId]["days"]));
      const projectDatess = test(roadmap, projectDuration)
      arrstart.push(projectDatess[0])
      arrend.push(projectDatess[1])
    }
    return [arrstart, arrend]
  }

  const calculatePhaseEndDate = (starting, duration) => {
    endDate = addDays(new Date(starting), duration);
    return endDate;
  }

  const calculateProjectEndDate = (starting, duration) => {
    endDatepro = addDays(new Date(starting), duration);
    return endDatepro;
  }

  const renderPhaseData = (id, roadmap) => {
    const phaseId = Object.keys(phases).filter(phaseId => phaseId === id)
    { starting == null ? starting = (Object.values(roadmap))[1] : starting = endDate }
    startingDates.push(new Date(starting))
    endingDates.push(calculatePhaseEndDate(starting, calculatePhaseDuration(Object.values(phases[phaseId]))))

    const ArrayofPhases = Object.values(phases[phaseId])[1]
    const arrstartend = calculateProjectDuration(ArrayofPhases, roadmap)
    startingDatespro.push(arrstartend[0])
    endingDatespro.push(arrstartend[1])
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

    console.log("tedad", phases[arrayofidphase[i]]["project"].length);
    //project
    for (let j = 0; j < phases[arrayofidphase[i]]["project"].length; j++) {
      ganttData.push({
        id: phases[arrayofidphase[i]]["project"][j]+arrayofidphase[i],
        name: projects[phases[arrayofidphase[i]]["project"][j]]["title"][0],
        type: "task",
        project: arrayofidphase[i],
        start: startingDatespro[i][j],
        end: endingDatespro[i][j],
        projectid: phases[arrayofidphase[i]]["project"][j],
      })
    }
  }

  const [view, setView] = useState(ViewMode.Month);
  const [tasks, setTasks] = useState(ganttData);
  const [project, setProject] = useState(null);
  console.log(tasks);
  useEffect(() => {
    setTasks(ganttData)
  }, [roadmapId]);

  let columnWidth = 60;
  if (view === ViewMode.Month) {
    columnWidth = 200;
  } else if (view === ViewMode.Week) {
    columnWidth = 150;
  }

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
    if (task.type === "task") {
      setProject(projects[task.projectid])
      handleShowModal()
    }
  };

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
        fontFamily={"inherit"}
        projectBackgroundColor="#313638"
        projectBackgroundSelectedColor="#313638"
        arrowColor={"#313638"}
        todayColor={"rgba(190, 190, 190, 0.5)"}
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
