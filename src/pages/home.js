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
       let phaseProjects =[]
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
                     { endingDate.push(endDate(starting, duration(Object.values(phase[phaseId])))) }
                     {phaseProjects.push(phase[phaseId]["project"].map(proj =>((project)[proj]).title))}
                     console.log(phaseProjects, "pp")
                     return (
                            <>
                                   <tr className="text-center bg-white  p-2 ">
                                          <td className="bg-white  p-2 ">{duration(Object.values(phase[phaseId]))} Days</td>
                                          <td className="bg-white  p-2 ">{phase[phaseId]["learning"].map(topic => <tr key={topic} >{((learn)[topic]).title}</tr>)}</td>
                                          <td className="bg-white  p-2 ">{phase[phaseId]["learning"].map(topic => <tr key={topic} >{((learn)[topic]).category}</tr>)}</td>
                                          <td className="bg-white  p-2 ">{phase[phaseId]["learning"].map(topic => <tr key={topic} >{((learn)[topic]).resources}</tr>)}</td>
                                          <td className="justify-center bg-white  p-2 "> {phase[phaseId]["project"].map(proj => <tr key={proj} >{((project)[proj]).title}</tr>)}</td>
                                   </tr>
                                   <tr>
                                          <td className="bg-gray-100 py-2 w-24">Evaluation</td>
                                          <td className="bg-gray-100 py-2 w-24"> {format(endDate(starting, duration(Object.values(phase[phaseId]))), "EEEE d MMM yyyy")}</td>
                                          <td className="bg-gray-100 py-2 w-24"></td>
                                          <td className="bg-gray-100 py-2 w-24"></td>
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

       const handleSubmit = (event) => {
              event.preventDefault()
              const form = new FormData(event.target)
              setResult(form.get("roadmap"))
              return result
       }


       // const findPhase = (phaseEndDates, startingDate) => {
       //        phaseEndDates.map((date, index) => {
       //                console.log(date, "e")
       //                console.log(startingDate, "sd")
       //        //       return ( new Date() > date[index] && new Date() < date[index+1] ) &&
       //        //       <p>You are in phase {index+1}</p>
       //        })

       // }

       return <div className="h-screen overflow-hidden">
              <div className="bg-black p-2 flex justify-between">
                     <h1 className="text-white p-2">Today is {format(new Date(), "EEEE d MMMM yyyy")}</h1>
                     <form className="flex" onSubmit={handleSubmit}>
                            <Select className="p-2 w-96 max-w-lg"
                                   classNamePrefix="select"
                                   closeMenuOnSelect={false}
                                   name={"roadmap"} options={options}>
                            </Select>
                            <button className="bg-white text-black rounded-lg" type="submit">Show Roadmap</button>
                     </form>
                     <Link to="/login">
                            <div className="bg-cyan text-white hover:border-gray-100 border-2 border-black p-2 rounded-lg flex">
                                   <button className="px-2">Log in as Admin</button>
                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                   </svg>
                            </div></Link>
              </div>
              <div className="flex w-screen h-full">
                     <div className="w-9/12 bg-white h-full">
                            {result &&
                                   <div className="flex w-full justify-center h-5/6 items-center">
                                          {starting = null}
                                          <div className="flex justify-center  shadow overflow-hidden border-b border-gray-200 my-5 rounded-lg">
                                                 <table className=" bg-white p-2 m-10">
                                                        <thead className="bg-gray-200">
                                                               <tr>
                                                                      <th scope="col"
                                                                             className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" colSpan="5">
                                                                             <div className="flex w-full justify-between">
                                                                                    <span>Starting Date  {(Object.values(roadmap[result]))[1]} </span>
                                                                                    <span>{(Object.values(roadmap[result]))[2]}</span>
                                                                             </div>
                                                                      </th>
                                                               </tr>
                                                               <tr>
                                                                      {(Object.keys(config.entities["roadmap"].readfields))
                                                                             .map(item => {
                                                                                    return <th scope="col"
                                                                                           className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" key={item}>{title(item)}</th>
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
                     </div>
                     <div className="bg-gray-700 w-3/12">
                            {!result && <p className="m-4 text-white">Please Select a Roadmap to see the data</p>}
                            {(((endingDate.length !== 0) && (compareDesc(new Date(endingDate[(endingDate.length) - 1]), new Date())) !== 1)) && <p className="text-white m-4">This Roadmap ends on {format(new Date(endingDate[(endingDate.length) - 1]), "P")}</p>}
                            {(((endingDate.length !== 0) && (compareDesc(new Date(endingDate[(endingDate.length) - 1]), new Date())) !== 1)) ?
                                   <p className="text-white m-4">{diffDays(new Date(), new Date(endingDate[(endingDate.length) - 1]))} days are left</p>
                                   : ((endingDate.length !== 0) && <p className="text-white m-4">This roadmap is finished</p>)}
                            {/* {((endingDate.length !== 0)) && findPhase(endingDate, new Date((Object.values(roadmap[result]))[1]))} */}
                            {(phaseProjects.length !== 0) && <Charts data={phaseProjects}/>}
                     </div>
              </div>
       </div>
}
export default Home;



