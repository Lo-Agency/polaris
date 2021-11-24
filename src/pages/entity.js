
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useState } from 'react';
import EntittyForm from "../components/admin/entityForm";
import { useCrud } from "../components/providers/crud.provider";
import config from "../util/config";



const Entity = () => {

    const { entityName, actionName } = useParams();
    const crud = useCrud();
    let data = crud.tableData;
    let myArr = []
    let entityContent = []
    let configFields = Object.keys(config.entities[entityName].fields);
    const [editID, setEditId] = useState(null);
    const sortData = () => {
        if (data) {
            const dataVal = Object.values(data)
            for (let i = 0; i < dataVal.length; i++) {
                for (let j = 0; j < configFields.length; j++) {
                    let myKey = Object.keys(dataVal[i]).filter(e => e == configFields[j])
                    myArr.push(dataVal[i][myKey]);
                }
                entityContent[i] = myArr;
                myArr = [];
            }
        }
    }
    sortData();
    const convertor = (item) => {
        let titles = [];
        let projects = [];
        // crud.learningTitle = [];
        // crud.projectTitle = []
        item[1] && (item[1]).map(elem => crud.readById("learning", elem));
        item[2] && (item[2]).map(elem => crud.readById("project", elem));
        titles = crud.learningTitle && (crud.learningTitle).map(item => item.title);
        projects = crud.projectTitle && (crud.projectTitle).map(item => item.title);

        return (
            <>
                <td className=" border-2 border-black">{item[0]}</td>
                <td className=" border-2 border-black">{titles}</td>
                <td className=" border-2 border-black">{projects}</td>
            </>
        )
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
        //list all the items for the firebase
        default: return <div className="flex h-auto justify-between items-start  w-11/12 border-4 border-gray-900 flex-col" >
            <div className="flex w-full justify-center h-5/6 items-center" >
                <table>
                    <thead>
                        <tr>
                            <th className="p-2" colSpan="5">{entityName}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {Object.keys(config.entities[entityName].fields).map(field => {
                                return <td className="bg-chineseSilver p-4 border-2 border-black" key={field}>{field}</td>
                            })}
                            <td className="bg-chineseSilver p-4 border-2 border-black">tools</td>
                        </tr>
                        {data ? entityContent.map((item, index) => {
                            return <tr className="p-4 border-2 border-black" key={item}>{!(entityName == "phase") ? item
                                .map(elem => { return <td className="p-4 border-2 border-black" key={elem}>{elem}</td> }) : convertor(item)}
                                <td className="flex p-4">
                                    <svg onClick={() => handleDelete(arr[index])} className="w-6 h-6 mr-2 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    <Link to={`/admin/${entityName}/edit`}>
                                        <svg onClick={() => handleEdit(arr[index])} className="w-6 h-6 cursor-pointer" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                                    </Link>



                                </td>
                            </tr>
                        }) : <p>is loading ...</p>}

                    </tbody>
                </table>
            </div>
            <div className="flex w-2/3 p-4 ">
                <Link className="px-2 py-2 m-2 rounded-lg bg-lightblue" to={`/admin/${entityName}/create`}>Create new {entityName}</Link>
            </div>
        </div >;
    }


}

export default Entity;