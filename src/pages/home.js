import { title } from 'case';
import { format } from 'date-fns';
import Select from 'react-select'
import { useState } from 'react';
import config from '../util/config';
import addDays from 'date-fns/addDays';
import { Link } from 'react-router-dom';
import React from 'react';
import { compareDesc } from 'date-fns';
import Charts from '../components/molecules/charts';
import { extractDataFromEntity } from '../util/extract-data';
import GanttChart from '../components/molecules/ganttchart/gantt-chart';


export function Home() {

       let endDate;
       let endingDats = [];
       let phaseProjects = []
       let starting = null;
       const [selectedRoadmap, setSelectedRoadmap] = useState(null);

       const roadmaps = extractDataFromEntity("roadmap");
       const learnings = extractDataFromEntity("learning");
       const projects = extractDataFromEntity("project")
       const phases = extractDataFromEntity("phase");

       // create options for roadmaps select box
       const options = roadmaps && Object.entries(roadmaps).map(roadmap => ({ "value": roadmap[0], "label": roadmap[1]["title"] }))

       //learnings data for table
       const renderLearningData = (phaseId) => {
              const phaseLearnings = phases[phaseId]["learning"]
              return (<>
                     <td className="px-6 py-4 whitespace-nowrap">{phaseLearnings.map(id => <p key={id} className="py-5 h-10">{learnings[id].title}</p>)}</td>
                     <td className="px-6 py-4 whitespace-nowrap">{phaseLearnings.map(id => <p key={id} className="py-5 h-10">{learnings[id].category}</p>)}</td>
                     <td className="px-6 py-4 whitespace-nowrap">{phaseLearnings.map(id => <p key={id} className="py-5 h-10 truncate max-w-xs" ><a className="overflow-ellipsis text-gray-500 underline" href={learnings[id].resources}>{learnings[id].resources}</a></p>)}</td>
                     <td className="px-6 py-4 whitespace-nowrap">{phaseLearnings.map(id => <p key={id} className="py-5 h-10">{learnings[id].priority}</p>)}</td>
              </>
              )
       }

       //calculate phase duration
       const calculatePhaseDuration = (phaseData) => {
              let phaseDuration = 0;
              for (let i = 0; i < (phaseData[1]).length; i++) {
                     let projectId = Object.keys(projects).filter(id => id === phaseData[1][i]);
                     phaseDuration += (Number(projects[projectId]["learningDay"]) + Number(projects[projectId]["days"]));
              }
              return phaseDuration;

       }

       //calculate ent date of phase
       const calculatePhaseEndDate = (starting, duration) => {
              endDate = addDays(new Date(starting), duration);
              return endDate;
       }

       //converting phaseData to table
       const renderPhaseData = (id, roadmap) => {
              const phaseId = Object.keys(phases).filter(phaseId => phaseId === id)
              { starting == null ? starting = (Object.values(roadmap))[1] : starting = endDate }
              endingDats.push(calculatePhaseEndDate(starting, calculatePhaseDuration(Object.values(phases[phaseId]))))
              phases[phaseId]["project"].forEach(projectId => phaseProjects.push(projects[projectId]["title"][0]))
       }

       //This function gives the days between two different dates
       const calculateRoadmapDuration = (date, otherDate) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));

       return <>
              <div className="relative ">
                     <header className="flex justify-between items-center max-w-full mx-auto px-4 sm:px-6 bg-black h-16">
                            <div className="flex text-black">
                                   <form className="flex ml-6">
                                          <Select
                                                 onChange={(value) => {

                                                        setSelectedRoadmap(value.value)
                                                 }}
                                                 theme={(theme) => ({
                                                        ...theme,
                                                        borderRadius: 0,
                                                        colors: {
                                                               ...theme.colors,
                                                               primary25: 'neutral10',
                                                               primary: 'black',
                                                               primary50: 'neutral20'
                                                        },
                                                 })}
                                                 className="p-2 w-96 max-w-lg"
                                                 classNamePrefix="select"
                                                 closeMenuOnSelect={false}
                                                 name={"roadmap"} options={options}>
                                          </Select>
                                   </form>
                            </div>

                            <div className="mr-10 justify-end z-10 text-white">
                                   <Link className="text-white p-2" to="/login">Log in</Link>
                            </div>
                     </header>


                     <div className='flex'>

                            {selectedRoadmap && <div className='px-3 mt-6 w-5/6'>
                                   <GanttChart roadmapId={selectedRoadmap} />
                            </div>}


                            {!selectedRoadmap ? <h1 className="text-black mt-10 mx-auto">
                                   Please Select a Roadmap to see the data</h1> :
                                   <div className=' bg-black h-screen  w-1/6 pt-20' style={{ marginTop: '-4rem' }}>
                                          {Object.values(roadmaps[selectedRoadmap])[0]
                                                 .map(phase => { return renderPhaseData(phase, roadmaps[selectedRoadmap]) }).filter(Boolean)}
                                          <div className="">
                                                 <div >
                                                        {phaseProjects.length !== 0 && <Charts phaseProjects={phaseProjects} projectList={projects} />}
                                                        {((endingDats.length !== 0 && (compareDesc(new Date(endingDats[(endingDats.length) - 1]), new Date())) !== 1)) && <p className="text-white text-xs text-center m-4">This Roadmap ends on {format(new Date(endingDats[(endingDats.length) - 1]), "P")}</p>}
                                                        {((endingDats.length !== 0 && (compareDesc(new Date(endingDats[(endingDats.length) - 1]), new Date())) !== 1)) ?
                                                               <p className="text-white text-xs text-center m-4">{calculateRoadmapDuration(new Date(), new Date(endingDats[(endingDats.length) - 1]))} days are left</p>
                                                               : ((endingDats.length !== 0) && <p className="text-white m-4">This roadmap is finished</p>)}
                                                 </div>
                                          </div>
                                   </div>
                            }
                     </div>
              </div>
       </>
}
export default Home;



