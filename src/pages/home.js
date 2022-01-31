import Select from 'react-select'
import { useState } from 'react';
import addDays from 'date-fns/addDays';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import DoughnutChart from '../components/organisms/doughnut-chart';
import { extractDataFromEntity } from '../util/extract-data';
import GanttChart from '../components/organisms/gantt-chart';
import TableView from '../components/molecules/table-roadmap';
import { useAuth } from '../components/providers/auth.provider';
import { ViewMode } from "gantt-task-react";

export function Home() {

       const view = localStorage.getItem('viewtype');
       const [viewcalendar, setView] = useState(ViewMode.Month);
       const [selectedRoadmap, setSelectedRoadmap] = useState(null);
       const [viewType, setViewType] = useState(view)

       const roadmaps = extractDataFromEntity("roadmap");
       const projects = extractDataFromEntity("project");
       const phases = extractDataFromEntity("phase");
       const groups = extractDataFromEntity("group");
       const users = extractDataFromEntity("user");
       const auth = useAuth();
       const navigate = useNavigate();
       const userData = users && users[auth.user.uid];

       let startDate = null;
       let endDate;
       let endDates = [];
       let phaseProjectsName = []

       const logOut = async () => {
              try {
                     await auth.logOut()
                     navigate('/login')
              } catch (e) {
                     console.log(e)
              }
       }

       // create options for roadmaps select box
       let options = roadmaps && Object.entries(roadmaps).map(roadmap => ({ "value": roadmap[0], "label": roadmap[1]["title"] }))

       if (userData?.type[0] != "admin" && userData?.group!="") {
              const userGroup = groups && userData.group.map(id => (Object.entries(groups).filter(group => group[0] == id)[0]))
              let userOptions = []
              userGroup && userGroup.forEach(group => group[1].roadmap.forEach(id => userOptions.push(options.filter(selectOption => selectOption.value == id)[0])))
              options = userOptions;
       }

       const RoadmapView = (viewtype) => {
              localStorage.setItem('viewtype', viewtype)
              const view = localStorage.getItem('viewtype');
              setViewType(view)
       }

       //calculate phase duration
       const calculatePhaseDuration = (phaseData) => {
              let phaseDuration = 0;
              let projectsPhase = phaseData[1]
              projectsPhase.forEach(id => {
                     let projectId = Object.keys(projects).find(projectId => projectId === id);
                     phaseDuration += (Number(projects[projectId]["learningDay"]) + Number(projects[projectId]["days"]));
              })

              return phaseDuration;
       }

       //calculate ent date of phase
       const calculatePhaseEndDate = (startDate, duration) => {
              endDate = addDays(new Date(startDate), duration);
              return endDate;
       }

       const renderPhaseData = (id, roadmap) => {
              const phaseId = Object.keys(phases).find(phaseId => phaseId === id)
              { startDate == null ? startDate = (Object.values(roadmap))[1] : startDate = endDate }
              endDates.push(calculatePhaseEndDate(startDate, calculatePhaseDuration(Object.values(phases[phaseId]))))
              phases[phaseId]["project"].forEach(projectId => phaseProjectsName.push(projects[projectId]["title"][0]))
       }

       return (
              <div className="flex flex-col">
                     <header className="navbar fixed w-full">
                            <h1 className="text-2xl">Polaris</h1>
                            <div>
                                   {userData?.type[0] == "admin" ?
                                          <button className='mr-5 btn'
                                                 onClick={() => { navigate('/admin/roadmap/list') }}>
                                                 Admin Panel
                                          </button>
                                          : null
                                   }
                                   <button onClick={logOut}>Logout</button>
                            </div>
                     </header>


                     {!selectedRoadmap ?
                            <div className='flex h-full items-center justify-center mt-72'>
                                   <form>
                                          <Select
                                                 onChange={(value) => {
                                                        setSelectedRoadmap(value.value)
                                                 }}

                                                 theme={(theme) => ({
                                                        ...theme,
                                                        borderRadius: 0,
                                                        colors: {
                                                               ...theme.colors,
                                                               primary25: '#C0C0C0',
                                                               primary50: '#C0C0C0',
                                                               primary: 'black',
                                                        },
                                                 })}
                                                 className="p-2 w-96 max-w-lg"
                                                 classNamePrefix="select"
                                                 closeMenuOnSelect={false}
                                                 name={"roadmap"}
                                                 options={options}>
                                          </Select>
                                   </form>
                            </div>
                            :
                            <div className='px-4 mt-20 mb-10'>
                                   <div className='flex justify-between mb-3'>
                                          {viewType === 'gantt' ? <div className="flex self-center">
                                                 <button className="btn" onClick={() => setView(ViewMode.Day)}>
                                                        Day
                                                 </button>
                                                 <button
                                                        className="btn mx-2"
                                                        onClick={() => setView(ViewMode.Week)}
                                                 >
                                                        Week
                                                 </button>
                                                 <button
                                                        className="btn mx-2"
                                                        onClick={() => setView(ViewMode.Month)}
                                                 >
                                                        Month
                                                 </button>
                                          </div> :
                                                 <div className='flex self-center'> <p>Starting Date  {(Object.values(roadmaps[selectedRoadmap]))[1]} </p> </div>}

                                          <div className='flex'>
                                                 <form className='mr-3'>
                                                        <Select
                                                               onChange={(value) => {
                                                                      setSelectedRoadmap(value.value)
                                                               }}

                                                               theme={(theme) => ({
                                                                      ...theme,
                                                                      borderRadius: 0,
                                                                      colors: {
                                                                             ...theme.colors,
                                                                             primary25: '#C0C0C0',
                                                                             primary50: '#C0C0C0',
                                                                             primary: 'black',
                                                                      },
                                                               })}
                                                               className=" w-96 max-w-lg"
                                                               classNamePrefix="select"
                                                               closeMenuOnSelect={false}
                                                               name={"roadmap"}
                                                               options={options}>
                                                        </Select>
                                                 </form>

                                                 <button onClick={() => RoadmapView('table')} >
                                                        <svg className="w-10 h-10 p-1 hover:bg-gray-200 hover:rounded-lg rounded" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                               xmlns="http://www.w3.org/2000/svg">
                                                               <path strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      strokeWidth="2"
                                                                      d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z">
                                                               </path>
                                                        </svg>
                                                 </button>

                                                 <button className="rotate" onClick={() => RoadmapView('gantt')} >
                                                        <svg className="w-10 h-10 p-1 hover:bg-gray-200 hover:rounded-lg rounded"
                                                               fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                 </button>

                                                 <button onClick={() => RoadmapView('doughnut')} >
                                                        <svg className="w-10 h-10 hover:bg-gray-200 hover:rounded-lg p-1 rounded" fill="none" stroke="currentColor"
                                                               viewBox="0 0 24 24"
                                                               xmlns="http://www.w3.org/2000/svg">
                                                               <path strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                                                               <path strokeLinecap="round"
                                                                      className=''
                                                                      strokeLinejoin="round"
                                                                      strokeWidth="" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                                                        </svg>
                                                 </button>
                                          </div>
                                   </div>
                                   {viewType === 'table' && <TableView roadmapId={selectedRoadmap} />}
                                   {viewType === 'gantt' && <GanttChart viewcalendar={viewcalendar} roadmapId={selectedRoadmap} />}
                                   {viewType === 'doughnut' && <DoughnutChart selectedRoadmap={selectedRoadmap} />}
                            </div>
                     }
              </div>
       )
}
export default Home;



