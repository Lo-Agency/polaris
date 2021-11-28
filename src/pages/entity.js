
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import EntittyForm from "../components/admin/entityForm";
import { useCrud } from "../components/providers/crud.provider";
import config from "../util/config";
import { title } from "case";
import { addDays, format } from 'date-fns';



const Entity = () => {

    const { entityName, actionName } = useParams();
    const crud = useCrud();
    let data = crud.tableData;
    let myArr = []
    let entityContent = []
    let configFields = Object.keys(config.entities[entityName].fields);
    const [editID, setEditId] = useState(null);
    // const [starting, setStarting] = useState(null);
    let starting = null;
    let eDate;


    useEffect(() => {
        crud.ReadRef("learning")
        crud.ReadRef("project")
        crud.ReadRef("phase")
        crud.ReadRef("roadmap")

    }, [crud.change])

    const duration = (item) => {
        if (crud.project && item[2]) {
            let phaseDuration = 0;
            for (let i = 0; i < (item[2]).length; i++) {
                let projectId = Object.keys(crud.project).filter(e => e === item[2][i]);
                phaseDuration += (Number(crud.project[projectId]["learningDay"]) + Number(crud.project[projectId]["days"]));
            }
            return phaseDuration;
        }
    }

    const sortData = () => {
        if (data && crud.tableData) {
            Object.values(crud.tableData).map((item, index) => {
                for (let i = 0; i < configFields.length; i++) {
                    let field = configFields[i];
                    // console.log(item,"iteeem")
                    // if(config.entities[entityName].fields[field].isArray){
                    //     item[field].map(id =>{
                    //         // Object.values(crud.tableData)
                    //         crud.mainData

                    //         // console.log(item[field],"ine")
                    //     })
                    //     // console.log(config.entities[entityName].fields[field].isArray)
                    //     // console.log(crud[field].item,"ine")
                    //     // myArr.push(crud.learning[item][title])
                    // }else{
                    //     myArr.push(item[field]);
                    // }
                    
                }
                entityContent[index] = myArr;
                myArr = [];

            })
        }
    }
    sortData();
    const convertor = (item) => {
        let lTitles = [];
        let pTitles = [];
        if (crud.learning && item[1]) {
            for (let i = 0; i < (item[1]).length; i++) {
                let learnId = Object.keys(crud.learning).filter(e => e === item[1][i])
                lTitles.push(crud.learning[learnId]["title"])
            }

        }
        if (crud.project && item[2]) {
            for (let i = 0; i < (item[2]).length; i++) {
                let projectId = Object.keys(crud.project).filter(e => e === item[2][i])
                pTitles.push(crud.project[projectId]["title"])
            }

        }

        return (
            <>
                <td className=" border-2 border-gray-400 text-center px-2">{item[0]}</td>
                <td className=" border-2 border-gray-400 px-2">{lTitles.join(', ')}</td>
                <td className=" border-2 border-gray-400 px-2">{pTitles.join(', ')}</td>
                <td className=" border-2 border-gray-400 px-2">{item[3]}</td>
            </>
        )
    }

    const endDate = (starting, duration) => {
        eDate = addDays(new Date(starting), duration);
        let endingDate = format(eDate, "EEEE d MMM yyyy")
        return endingDate;
    }

    const phaseConvertor = (item, roadmap) => {
        if (crud.phase && item && crud.learning) {
            let phaseId = Object.keys(crud.phase).filter(phaseId => phaseId === item)
            { starting == null ? starting = (Object.values(roadmap))[1] : starting = eDate }
            return (
                <>
                    <tr className="text-center bg-white border-2 p-2 border-gray-400">
                        <td className="bg-white border-2 p-2 border-gray-400">{duration(Object.values(crud.phase[phaseId]))} Days</td>
                        <td className="bg-white border-2 p-2 border-gray-400">{crud.phase[phaseId]["learning"].map(learning => <tr key={learning} >{((crud.learning)[learning]).title}</tr>)}</td>
                        <td className="bg-white border-2 p-2 border-gray-400">{crud.phase[phaseId]["learning"].map(learning => <tr key={learning} >{((crud.learning)[learning]).category}</tr>)}</td>
                        <td className="bg-white border-2 p-2 border-gray-400">{crud.phase[phaseId]["learning"].map(learning => <tr key={learning} >{((crud.learning)[learning]).resources}</tr>)}</td>
                        <td className="justify-center bg-white border-2 p-2 border-gray-400"> {crud.phase[phaseId]["project"].map(project => <tr key={project} >{((crud.project)[project]).title}</tr>)}</td>
                    </tr>
                    <tr>
                        <td className="bg-greenLemon py-2 w-24 border-gray-400 border-l-2 border-b-2">First Evaluation</td>
                        <td className="bg-greenLemon py-2 w-24"> {endDate(starting, duration(Object.values(crud.phase[phaseId])))}</td>
                        <td className="bg-greenLemon py-2 w-24"></td>
                        <td className="bg-greenLemon py-2 w-24"></td>
                        <td className="bg-greenLemon py-2 w-24 border-gray-400 border-r-2 border-b-2"></td>
                    </tr>
                </>
            )
        }
    }


    let arr = []
    data && Object.keys(data).map(elem => arr.push(elem))

    const handleDelete = (item) => {
        crud.Delete(item);
    }

    const handleEdit = (item) => {
        setEditId(item);
        crud.Read(item);

    }

    switch (actionName) {
        case "create":
            return <><EntittyForm entityName={entityName} actionName={actionName} editData={null} /> </>
        case "edit":
            return <><EntittyForm entityName={entityName} actionName={actionName} editData={crud.editData} editID={editID} /> </>

        case "remove":
            return <> <EntittyForm entityName={entityName} actionName={actionName} /> </>


        default:

            return <div className="flex h-auto justify-between items-start w-11/12  flex-col" >
                <div className="flex w-full justify-center h-5/6 items-center" >
                    <table className="shadow-lg">
                        <thead>
                            <tr>
                                <th className="p-2" colSpan="5">{entityName}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {Object.keys(config.entities[entityName].fields)
                                    .map(field => {
                                        return <td className=" bg-grass-green p-4 border-2 border-gray-400" key={field}>{title(field)}</td>
                                    })}

                                <td className=" bg-grass-green p-4 border-2 border-gray-400">Tools</td>
                            </tr>

                            {data ? entityContent.map((item, index) => {
                            
                                return <tr className=" text-center p-4 border-2 border-gray-400" key={index}>{item
                                    .map((elem, index) => { return <td className="p-4 border-2 border-gray-400" key={index}>{elem}</td> })}
                                    <td className="flex p-4">
                                        <svg onClick={() => handleDelete(arr[index])} className="w-6 h-6 mr-2 cursor-pointer" fill="none" stroke="Gray" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        <Link to={`/admin/${entityName}/edit`}>
                                            <svg onClick={() => handleEdit(arr[index])} className="w-6 h-6 cursor-pointer" stroke="Gray" fill="gray" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                                        </Link>
                                    </td>
                                </tr>
                            }) : <tr>is loading ...</tr>}

                        </tbody>
                    </table>
                </div>
                <div className="flex w-2/3 p-4 ">
                    <Link className="px-2 py-2 m-2 rounded-lg bg-lightblue transition-colors hover:bg-cyan" to={`/admin/${entityName}/create`}>Create new {entityName}</Link>
                </div>
            </div>

    }


}

export default Entity;