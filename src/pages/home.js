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
              phaseProjects.push(phases[phaseId]["project"].map(projectId => ((projects)[projectId]).title))
              return (
                     <React.Fragment key={id}>
                            <tr>
                                   <td className="px-6 whitespace-nowrap">{calculatePhaseDuration(Object.values(phases[phaseId]))} Days</td>
                                   {renderLearningData(phaseId)}
                                   <td className="px-6 py-4 whitespace-nowrap">
                                          <ul >
                                                 {phases[phaseId]["project"].map(proj => <li className="py-5 h-20" key={proj} >{(projects[proj]).title}</li>)}
                                          </ul>
                                   </td>
                            </tr>
                            <tr>
                                   <td className="bg-gray-100 py-2 w-24">Evaluation</td>
                                   <td colSpan="5" className="bg-gray-100 py-2 w-24"> {format(calculatePhaseEndDate(starting, calculatePhaseDuration(Object.values(phases[phaseId]))), "EEEE d MMM yyyy")}</td>

                            </tr>
                     </React.Fragment>
              )
       }

       //This function gives the days between two different dates
       const calculateRoadmapDuration = (date, otherDate) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));
       
       return <div className="flex items-center relative min-h-screen justify-center ">
              <div className="bg-black p-2 flex fixed self-center mx-auto top-0 right-0 w-screen justify-between">
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
                     <Link className="text-white p-2" to="/login">Log in</Link>
              </div>
              {!selectedRoadmap ? <h1 className="text-black relative h-36 ">Please Select a Roadmap to see the data</h1> :
                     <div className="flex items-center  justify-start w-screen">
                            <div className="flex self-start w-full overflow-hidden justify-center items-center">
                                   {starting = null}
                                   <div className="flex justify-center w-full self-start flex-col  mt-20 m-5 ">
                                          <div> <p >Starting Date  {(Object.values(roadmaps[selectedRoadmap]))[1]} </p> </div>
                                          <table className="my-5 border-b border-gray-200 w-l self-start ">
                                                 <thead className="bg-black w-full">
                                                        <tr>
                                                               {Object.keys(config.entities["roadmap"].readfields)
                                                                      .map((field, index) => {
                                                                             return <th scope="col"
                                                                                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider" key={index}>{title(field)}</th>
                                                                      })}
                                                        </tr>
                                                 </thead>
                                                 <tbody className="bg-white">
                                                        {Object.values(roadmaps[selectedRoadmap])[0]
                                                               .map(phase => { return renderPhaseData(phase, roadmaps[selectedRoadmap]) }).filter(Boolean)}
                                                 </tbody>
                                          </table>
                                   </div>
                            </div>

                            <div className="bg-black fixed top-16 right-0 h-screen w-2/12">
                                   <div className="mt-40">
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
}
export default Home;



