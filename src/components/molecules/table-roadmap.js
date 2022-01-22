import { title } from 'case';
import { format } from 'date-fns';
import config from '../../util/config';
import addDays from 'date-fns/addDays';
import React from 'react';
import { extractDataFromEntity } from '../../util/extract-data';

const TableView = ({ roadmapId }) => {

    let endDate;
    let endingDats = [];
    let phaseProjects = []
    let starting = null;
    const roadmaps = extractDataFromEntity("roadmap");
    const learnings = extractDataFromEntity("learning");
    const projects = extractDataFromEntity("project")
    const phases = extractDataFromEntity("phase");

    //learnings data for table
    const renderLearningData = (phaseId) => {
        const phaseLearnings = phases[phaseId]["learning"]
        return (<>
            <td className="px-6 py-4 whitespace-nowrap">{phaseLearnings.map(id => <p key={id} className="py-5 h-10">{learnings[id].title}</p>)}</td>
            <td className="px-6 py-4 whitespace-nowrap">{phaseLearnings.map(id => <p key={id} className="py-5 h-10">{learnings[id].category}</p>)}</td>
            <td className="px-6 py-4 whitespace-nowrap">{phaseLearnings.map(id => <p key={id} className="py-5 h-10 truncate max-w-xs" ><a className="overflow-ellipsis text-gray-500 underline" href={learnings[id].resources}>{learnings[id].resources}</a></p>)}</td>
            <td className="px-6 py-4 whitespace-nowrap">{phaseLearnings.map(id => <p key={id} className="py-5 h-10">{learnings[id].priority}</p>)}</td>
        </>)
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

    return (
        <div className="flex w-full overflow-hidden justify-center items-center">
            {starting = null}
            <div className="flex justify-center w-full flex-col ">
                <div> <p >Starting Date  {(Object.values(roadmaps[roadmapId]))[1]} </p> </div>
                <table className="my-5 border-b border-gray-200 w-l">
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
                        {Object.values(roadmaps[roadmapId])[0]
                            .map(phase => { return renderPhaseData(phase, roadmaps[roadmapId]) }).filter(Boolean)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableView;