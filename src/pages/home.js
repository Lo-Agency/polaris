import { random, title } from 'case';
import { format } from 'date-fns';
import { useCrud } from '../components/providers/crud.provider';
import Select from 'react-select'
import { useState, useEffect } from 'react';
import config from '../util/config';
import addDays from 'date-fns/addDays';
import { Link } from 'react-router-dom';
import React from 'react';
import { compareDesc } from 'date-fns'
import charts from '../components/admin/charts';
import Charts from '../components/admin/charts';


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
                                   <tr className="text-center my-10  bg-whi p-4 ">
                                          <td className="flex-shrink-0 h-auto px-6 py-4 m-10 text-left text-s whitespace-nowrap  max-w-xs ">{duration(Object.values(phase[phaseId]))} Days</td>
                                          <td className="flex-shrink-0  h-auto px-6 py-4   text-left text-s whitespace-nowrap  max-w-xs ">{phase[phaseId]["learning"].map(topic => <tr className="py-10" key={topic} >{((learn)[topic]).title}</tr>)}</td>
                                          <td className="flex-shrink-0 h-auto px-6 py-4 text-left text-s whitespace-nowrap  max-w-xs ">{phase[phaseId]["learning"].map(topic => <tr  className="py-10" key={topic} >{((learn)[topic]).category}</tr>)}</td>
                                          <td className="flex-shrink-0 h-auto px-6 py-4 text-left text-s whitespace-nowrap overflow-hidden max-w-xs ">{phase[phaseId]["learning"].map(topic => <tr  className="py-10" key={topic} ><a href={((learn)[topic]).resources}>{((learn)[topic]).resources}</a></tr>)}</td>
                                          <td className="flex-shrink-0 h-auto px-6 py-4 text-left text-s whitespace-nowrap  max-w-xs ">{phase[phaseId]["learning"].map(topic => <tr  className="py-10" key={topic} >{((learn)[topic]).priority}</tr>)}</td>
                                          <td className=" flex flex-col h-auto flex-shrink-0 px-6 py-3 text-left text-s whitespace-nowrap  max-w-xs "> {phase[phaseId]["project"].map(proj => <tr key={proj} >{((project)[proj]).title}</tr>)}</td>
                                   </tr>
                                   <tr>
                                          <td className="bg-gray-100 py-2 w-24">Evaluation</td>
                                          <td className="bg-gray-100 py-2 w-24"> {format(endDate(starting, duration(Object.values(phase[phaseId]))), "EEEE d MMM yyyy")}</td>
                                          <td className="bg-gray-100 py-2 w-24"></td>
                                          <td className="bg-gray-100 py-2 w-24"></td>
                                          <td className="bg-gray-100 py-2 w-24 "></td>
                                          <td className="bg-gray-100 py-2 w-24 "></td>
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
       return <div className="flex items-center justify-start ">
              <div className="bg-black p-2 flex fixed top-0 right-0 w-screen justify-between">
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
              <div className="flex items-center  justify-start w-screen">

                     {result &&
                            <div className="flex self-start w-full overflow-hidden justify-center items-center">
                                   {starting = null}
                                   <div className="flex justify-center w-full self-start flex-col  mt-20 m-5 ">
                                          <p >Starting Date  {(Object.values(roadmap[result]))[1]} </p>
                                          <table className="my-10 border-b border-gray-200 w-l self-start shadow-md ">
                                                 <thead className="bg-black w-full">
                                                        <tr>
                                                               {(Object.keys(config.entities["roadmap"].readfields))
                                                                      .map(item => {
                                                                             return <th scope="col"
                                                                                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider" key={item}>{title(item)}</th>
                                                                      })}
                                                        </tr>
                                                 </thead>
                                                 <tbody className="bg-white divide-y divide-gray-200">

                                                        {roadmap && (((Object.values(roadmap[result]))[0]))
                                                               .map(item => { return phaseConvertor(item, roadmap[result]) })}
                                                 </tbody>
                                          </table>
                                   </div>
                            </div>}

                     <div className="bg-black fixed top-16 right-0 h-screen w-2/12">
                            {!result && <p className="m-4 text-xs text-white">Please Select a Roadmap to see the data</p>}
                             <div className="mt-40">
                                                                      
                            {(phaseProjects.length !== 0) && <Charts phaseProjects={phaseProjects} projectList={project} />}
                            {(((endingDate.length !== 0) && (compareDesc(new Date(endingDate[(endingDate.length) - 1]), new Date())) !== 1)) && <p className="text-white text-xs text-center m-4">This Roadmap ends on {format(new Date(endingDate[(endingDate.length) - 1]), "P")}</p>}
                            {(((endingDate.length !== 0) && (compareDesc(new Date(endingDate[(endingDate.length) - 1]), new Date())) !== 1)) ?
                                   <p className="text-white text-xs text-center m-4">{diffDays(new Date(), new Date(endingDate[(endingDate.length) - 1]))} days are left</p>
                                   : ((endingDate.length !== 0) && <p className="text-white m-4">This roadmap is finished</p>)}
                             </div>

                     </div>
              </div>
       </div>
}
export default Home;



