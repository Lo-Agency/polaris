import { random, title } from 'case';
import { format } from 'date-fns';
import { useCrud } from '../components/providers/crud.provider';
import Select from 'react-select'
import { useState, useEffect } from 'react';
import config from '../util/config';
import addDays from 'date-fns/addDays';
import { Link } from 'react-router-dom';
import React from 'react';


export function Home() {
       const crud = useCrud();
       let entityData, roadmap, phase, phaseData, projectData, project, learningData, learn, eDate, a;
       let label=[];
       let value=[];
       let options=[];
       let endingDate = [];
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
              if (project && item[2]) {
                     let phaseDuration = 0;
                     for (let i = 0; i < (item[2]).length; i++) {
                            let projectId = Object.keys(project).filter(e => e === item[2][i]);
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
                     return (
                            <>
                                   <tr className="text-center bg-white border-2 p-2 border-gray-400">
                                          <td className="bg-white border-2 p-2 border-gray-400">{duration(Object.values(phase[phaseId]))} Days</td>
                                          <td className="bg-white border-2 p-2 border-gray-400">{phase[phaseId]["learning"].map(topic => <tr key={topic} >{((learn)[topic]).title}</tr>)}</td>
                                          <td className="bg-white border-2 p-2 border-gray-400">{phase[phaseId]["learning"].map(topic => <tr key={topic} >{((learn)[topic]).category}</tr>)}</td>
                                          <td className="bg-white border-2 p-2 border-gray-400">{phase[phaseId]["learning"].map(topic => <tr key={topic} >{((learn)[topic]).resources}</tr>)}</td>
                                          <td className="justify-center bg-white border-2 p-2 border-gray-400"> {phase[phaseId]["project"].map(proj => <tr key={proj} >{((project)[proj]).title}</tr>)}</td>
                                   </tr>
                                   <tr>
                                          <td className="bg-greenLemon py-2 w-24 border-gray-400 border-l-2 border-b-2">Evaluation</td>
                                          <td className="bg-greenLemon py-2 w-24"> {format(endDate(starting, duration(Object.values(phase[phaseId]))), "EEEE d MMM yyyy")}</td>
                                          { endingDate.push(endDate(starting, duration(Object.values(phase[phaseId]))))}
                                          <td className="bg-greenLemon py-2 w-24"></td>
                                          <td className="bg-greenLemon py-2 w-24"></td>
                                          <td className="bg-greenLemon py-2 w-24 border-gray-400 border-r-2 border-b-2"></td>
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

       roadmap && console.log(Object.keys(roadmap), "objectkeysrodamap")


       const diffDays = (date, otherDate) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));




       const handleSubmit = (event) => {
              event.preventDefault()
              const form = new FormData(event.target)
              setResult(form.get("roadmap"))
              return result
       }

       return <>
              <div className="bg-blue p-2 flex justify-between">
                     <h1 className="bg-blue p-2">Today is {format(new Date(), "EEEE d MMMM yyyy")}</h1>
                     <form onSubmit={handleSubmit}>
                            <Select className="p-2 max-w-lg"
                                   classNamePrefix="select"
                                   closeMenuOnSelect={false}
                                   name={"roadmap"} options={options}>
                            </Select>
                            <button className="bg-cyan p-2" type="submit">Show Roadmap</button>
                     </form>
                     <Link to="/login">
                            <div className="bg-cyan text-white p-2 rounded-lg flex">
                                   <button className="px-2">Log in as Admin</button>
                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                   </svg>
                            </div></Link>
              </div>
              <div className="flex w-screen">
                     {result ?
                            <div className="w-8/12 bg-lemon">
                                   {starting = null}
                                   <div>
                                          <table className="border-2 border-gray-400 bg-white p-2 m-10">
                                                 <thead>
                                                        <tr>
                                                               <th className="p-2 bg-green w-full " colSpan="5"><div className="flex w-full justify-between">
                                                                      <span>Starting Date  {(Object.values(roadmap[result]))[1]} </span>
                                                                      <span>{(Object.values(roadmap))[2]} </span>
                                                               </div>
                                                               </th>
                                                        </tr>
                                                 </thead>
                                                 <tbody>
                                                        <tr>
                                                               {(Object.keys(config.entities["roadmap"].readfields))
                                                                      .map(item => { return <td className=" bg-blue p-4 border-2 border-gray-400 text-center" key={item}>{title(item)}</td> })}
                                                        </tr>
                                                        {roadmap && (((Object.values(roadmap[result]))[0]))
                                                               .map(item => { return phaseConvertor(item, roadmap[result]) })}
                                                 </tbody>
                                          </table>
                                   </div>
                            </div>
                            : <p>select ur roadmap</p>}
                     
                     {/* { a = (format(endingDate.pop(),"P")) }
                     {console.log(a)} */}
                     

                     <div className="bg-grass-green w-4/12">
                            {/* { <p> Days left to the end of this phase{format(endingDate.pop(),"P")}</p>} */}
                            {/* {let newDateString = (format(endingDate.pop(),"P")).replace(/,-) } */}
                            {/* <p>{format(endingDate.pop(), "P")}</p> */}
                            {/* { <p>{diffDays(new Date(format(new Date(),"P")), new Date(format(endingDate.pop(),"P")))}</p>} */}
                            {/* {<p>{diffDays(new Date('2014-12-19'), new Date('2020-01-01'))}</p>} */}
                     </div>
              </div>
       </>
}
export default Home;



