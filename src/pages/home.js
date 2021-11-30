import { random, title } from 'case';
import { format } from 'date-fns';
import { useCrud } from '../components/providers/crud.provider';
import Select from 'react-select'
import { useState, useEffect } from 'react';
import config from '../util/config';
import addDays from 'date-fns/addDays';


function Home() {
       const crud = useCrud();
       let entityData;
       let roadmap;
       let label = [];
       let value = [];
       let options = [];
       let phaseData;
       let phase;
       let projectData;
       let project;
       let learningData;
       let learn;
       let starting = null;
       let eDate;
       let roadmapId;
       const [result, setResult] = useState(null);
       crud.dataState && (entityData = crud.dataState.filter(elem => Object.keys(elem) == "roadmap"))
       crud.dataState && (phaseData = crud.dataState.filter(elem => Object.keys(elem) == "phase"))
       crud.dataState && (learningData = crud.dataState.filter(elem => Object.keys(elem) == "learning"))
       crud.dataState && (projectData = crud.dataState.filter(elem => Object.keys(elem) == "project"))
       crud.dataState && console.log((Object.values(entityData[0])[0]), "rntityData")
       crud.dataState && (roadmap = (Object.values(entityData[0])[0]));
       crud.dataState && (phase = (Object.values(phaseData[0])[0]));
       crud.dataState && (learn = (Object.values(learningData[0])[0]))
       crud.dataState && (project = (Object.values(projectData[0])[0]))


       // ------------------

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
              let endingDate = format(eDate, "EEEE d MMM yyyy")
              return endingDate;
       }

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
                                          <td className="bg-greenLemon py-2 w-24"> {endDate(starting, duration(Object.values(phase[phaseId])))}</td>
                                          <td className="bg-greenLemon py-2 w-24"></td>
                                          <td className="bg-greenLemon py-2 w-24"></td>
                                          <td className="bg-greenLemon py-2 w-24 border-gray-400 border-r-2 border-b-2"></td>
                                   </tr>
                            </>
                     )
              }
       }
       //    -----------------------

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

       const handleSubmit = (event) => {
              event.preventDefault()
              const form = new FormData(event.target)
              setResult(form.get("roadmap"))
              //result && (roadmap && console.log(roadmap,result, "roadmapresult"))
              //result && (roadmap && console.log(roadmap[result], "rr"))

              return result
       }

       return <>
              <h1 className="bg-blue p-2">Today is {format(new Date(), "EEEE d MMMM yyyy")}</h1>
              <form onSubmit={handleSubmit}>
                     <Select className="p-2 max-w-lg"
                            classNamePrefix="select"
                            closeMenuOnSelect={false}
                            name={"roadmap"} options={options}>
                     </Select>
                     <button className="bg-cyan p-2" type="submit">Submit</button>
              </form>
              {result ?
                     <div>
                            {roadmap && console.log(roadmap, result, "roadmapresult")}
                            {roadmap && console.log(roadmap[result], "rr")}

                            {/* //       roadmap && (roadmapId =  Object.keys(roadmap).filter(id => id === result)) */}
                           
                                   { starting = null }
                                   <div>
                                          <table className="border-2 border-gray-400 bg-white p-2 mb-10">
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

       </>


}

export default Home;

