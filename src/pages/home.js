import { format } from 'date-fns';
import Select from 'react-select'
import { useState } from 'react';
import addDays from 'date-fns/addDays';
import { Link } from 'react-router-dom';
import React from 'react';
import { compareDesc } from 'date-fns';
import Charts from '../components/molecules/doughnut-chart';
import { extractDataFromEntity } from '../util/extract-data';
import GanttChart from '../components/organisms/gantt-chart';
import TableView from '../components/molecules/table-roadmap';

export function Home() {

       let endDate;
       let endingDats = [];
       let phaseProjects = []
       let starting = null;
       const [selectedRoadmap, setSelectedRoadmap] = useState(null);

       function viewToggle(viewtype) {
              localStorage.setItem('viewtype', viewtype)
              const view = localStorage.getItem('viewtype');
              setViewType(view)
       }

       const view = localStorage.getItem('viewtype');
       const [viewType, setViewType] = useState(view)


       const roadmaps = extractDataFromEntity("roadmap");
       const projects = extractDataFromEntity("project")
       const phases = extractDataFromEntity("phase");

       // create options for roadmaps select box
       const options = roadmaps && Object.entries(roadmaps).map(roadmap => ({ "value": roadmap[0], "label": roadmap[1]["title"] }))

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
                            {selectedRoadmap && <div className='px-3 my-4 w-5/6'>
                                   <div className='flex justify-end'>
                                          <button onClick={() => viewToggle('true')} className="btn">Table view</button>
                                          <button onClick={() => viewToggle('false')} className="btn">Gantt view</button>
                                   </div>
                                   {viewType == 'true' && <TableView roadmapId={selectedRoadmap} />}
                                   {viewType == 'false' && <GanttChart roadmapId={selectedRoadmap} />}
                            </div>}
                            
                            {/* Doughnut Chart */}
                            {!selectedRoadmap ? <h1 className="text-black mt-10 mx-auto">
                                   Please Select a Roadmap to see the data</h1> :
                                   <div className=' bg-black h-auto min-h-screen w-1/6 pt-20' style={{ marginTop: '-4rem' }}>
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



