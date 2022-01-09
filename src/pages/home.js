import { random, title } from 'case';
import { format } from 'date-fns';
import { useCrud } from '../components/providers/crud.provider';
import Select from 'react-select'
import { useState, useEffect } from 'react';
import config from '../util/config';
import addDays from 'date-fns/addDays';
import { Link } from 'react-router-dom';
import React from 'react';
import { compareDesc } from 'date-fns';
import Charts from '../components/molecules/charts';


export function Home() {
       const crud = useCrud();
       let entityData, roadmap, phase, phaseData, projectData, project, learningData, learn, eDate;
       let label = [];
       let value = [];
       let options = [];
       let endingDate = [];
       let phaseProjects = []
       let starting = null;
       const [result, setResult] = useState(null);
       crud.dataState && (entityData = crud.dataState.filter(elem => Object.keys(elem) == "roadmap"))
       crud.dataState && (phaseData = crud.dataState.filter(elem => Object.keys(elem) == "phase"))
       crud.dataState && (learningData = crud.dataState.filter(elem => Object.keys(elem) == "learning"))
       crud.dataState && (projectData = crud.dataState.filter(elem => Object.keys(elem) == "project"))
       crud.dataState && (roadmap = (Object.values(entityData[0])[0]));
       crud.dataState && (phase = (Object.values(phaseData[0])[0]));
       crud.dataState && (learn = (Object.values(learningData[0])[0]))
       crud.dataState && (project = (Object.values(projectData[0])[0]))

       const duration = (item) => {
              if (project && item[1]) {
                     let phaseDuration = 0;
                     for (let i = 0; i < (item[1]).length; i++) {
                            let projectId = Object.keys(project).filter(e => e === item[1][i]);
                            phaseDuration += (Number(project[projectId]["learningDay"]) + Number(project[projectId]["days"]));
                     }
                     return phaseDuration;
              }
       }

       const endDate = (starting, duration) => {
              eDate = addDays(new Date(starting), duration);
              return eDate;
       }
       //converting phaseData to table
       const phaseConvertor = (item, roadmap) => {
              if (phase && item && learn) {
                     let phaseId = Object.keys(phase).filter(phaseId => phaseId === item)
                     { starting == null ? starting = (Object.values(roadmap))[1] : starting = eDate }
                     { endingDate.push(endDate(starting, duration(Object.values(phase[phaseId])))) }
                     { phaseProjects.push(phase[phaseId]["project"].map(proj => ((project)[proj]).title)) }
                     return (
                            <>
                                   <tr>
                                          <td className="px-6 whitespace-nowrap">{duration(Object.values(phase[phaseId]))} Days</td>
                                          <td className="px-6 py-4 h-10 whitespace-nowrap">{phase[phaseId]["learning"].map(topic => <p className="py-5 h-10  " key={topic} >{((learn)[topic]).title}</p>)}</td>
                                          <td className="px-6 py-4 whitespace-nowrap ">{phase[phaseId]["learning"].map(topic => <p  className="py-5 h-10" key={topic} >{((learn)[topic]).category}</p>)}</td>
                                          <td className="px-6 py-4 whitespace-nowrap truncate overflow-ellipsis max-w-xs ">{phase[phaseId]["learning"].map(topic => <p  className="py-5 h-10 truncate max-w-xs" key={topic} ><a className="overflow-ellipsis text-gray-500 underline" href={((learn)[topic]).resources}>{((learn)[topic]).resources}</a></p>)}</td>
                                          <td className="px-6 py-4 whitespace-nowrap">{phase[phaseId]["learning"].map(topic => <p  className="py-5 h-10" key={topic} >{((learn)[topic]).priority}</p>)}</td>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                                 <ul >
                                                 {phase[phaseId]["project"].map(proj => <li className="py-5 h-20" key={proj} >{((project)[proj]).title}</li>)}
                                                 </ul>
                                          </td>
                                   </tr>
                                   <tr>
                                          <td className="bg-gray-100 py-2 w-24">Evaluation</td>
                                          <td colSpan="5" className="bg-gray-100 py-2 w-24"> {format(endDate(starting, duration(Object.values(phase[phaseId]))), "EEEE d MMM yyyy")}</td>
              
                                   </tr>
                            </>
                     )
              }
       }

       crud.dataState && (Object.values(roadmap)).map(item => {
              label.push(item.title)
       })
       crud.dataState && (Object.keys(roadmap)).map(item => {
              value.push(item)
       })
       for (let i = 0; i < value.length; i++) {
              options.push({ "value": value[i], "label": label[i][0] })
       }
       //This function gives the days between two different dates
       const diffDays = (date, otherDate) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));
       return <div className="flex items-center relative min-h-screen justify-center ">
              <div className="bg-black p-2 flex fixed self-center mx-auto top-0 right-0 w-screen justify-between">
                     <form className="flex ml-6">
                            <Select onChange={
                                   (value) => {
                                          setResult(value.value)

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
              {!result ? <h1 className="text-black relative h-36 ">Please Select a Roadmap to see the data</h1>:
              <div className="flex items-center  justify-start w-screen">
              
                     
                            <div className="flex self-start w-full overflow-hidden justify-center items-center">
                                   {starting = null}
                                   <div className="flex justify-center w-full self-start flex-col  mt-20 m-5 ">
                                          <div> <p >Starting Date  {(Object.values(roadmap[result]))[1]} </p> </div>
                                          <table className="my-5 border-b border-gray-200 w-l self-start ">
                                                 <thead className="bg-black w-full">
                                                        <tr>
                                                               {(Object.keys(config.entities["roadmap"].readfields))
                                                                      .map((item, index) => {
                                                                             return <th scope="col"
                                                                                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider" key={index}>{title(item)}</th>
                                                                      })}
                                                        </tr>
                                                 </thead>
                                                 <tbody className="bg-white">

                                                        {roadmap && (((Object.values(roadmap[result]))[0]))
                                                               .map(item => { return phaseConvertor(item, roadmap[result]) }).filter(Boolean)}
                                                 </tbody>
                                          </table>
                                   </div>
                            </div>

       <div className="bg-black fixed top-16 right-0 h-screen w-2/12">
                           
                             <div className="mt-40">
                                                                      
                            {(phaseProjects.length !== 0) && <Charts phaseProjects={phaseProjects} projectList={project} />}
                            {(((endingDate.length !== 0) && (compareDesc(new Date(endingDate[(endingDate.length) - 1]), new Date())) !== 1)) && <p className="text-white text-xs text-center m-4">This Roadmap ends on {format(new Date(endingDate[(endingDate.length) - 1]), "P")}</p>}
                            {(((endingDate.length !== 0) && (compareDesc(new Date(endingDate[(endingDate.length) - 1]), new Date())) !== 1)) ?
                                   <p className="text-white text-xs text-center m-4">{diffDays(new Date(), new Date(endingDate[(endingDate.length) - 1]))} days are left</p>
                                   : ((endingDate.length !== 0) && <p className="text-white m-4">This roadmap is finished</p>)}
                             </div>

                     </div>

                     
              </div>
}
       </div>
}
export default Home;



