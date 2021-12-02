
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useState } from 'react';
import EntittyForm from "../components/admin/entityForm";
import { useCrud } from "../components/providers/crud.provider";
import config from "../util/config";
import { title } from "case";

const Entity = () => {

    const { entityName, actionName } = useParams();
    const crud = useCrud();
    let tempContainer = []
    let entityContent = []
    let configFields = Object.keys(config.entities[entityName].fields);
    const [editID, setEditId] = useState(null);
    let entityData;
    crud.dataState && (entityData = crud.dataState.filter(elem => Object.keys(elem) == entityName))
    console.log(((entityData[0]).phase !== null))
    const sortData = () => {
        if (crud.dataState && ((entityData[0]).entityName) !== null) {

            entityData[0] && Object.values((Object.values(entityData[0]))[0]).map((item, index) => {
                configFields.map(field => {
                    if (config.entities[entityName].fields[field].isArray && (crud.dataState != [])) {
                        let fieldData = crud.dataState.filter(i => Object.keys(i) == field)
                        fieldData = fieldData.map(item => (Object.values(item)))
                        tempContainer.push((item[field]).map(id => fieldData[0][0][id].title).join(", "))
                    } else {
                        tempContainer.push(item[field]);
                    }
                })
                entityContent[index] = tempContainer;
                tempContainer = [];
            })
        }
    }

    sortData();
    let deleteId = []
    Object.keys(Object.values(entityData[0])[0]).map(elem => deleteId.push(elem))

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
                <div className="flex py-4">
                    <Link className=" py-2 my-2 text-center w-56 rounded-lg bg-gray-500 text-white transition-colors hover:text-black" to={`/admin/${entityName}/create`}>Create new {entityName}</Link>
                </div>
                <div className="flex w-full justify-center h-5/6 items-center shadow overflow-hidden border-b border-gray-200 my-10 rounded-lg" >
                    <table className="my-10">
                        <thead className="bg-gray-200">

                            <tr>
                                {Object.keys(config.entities[entityName].fields)
                                    .map(field => {
                                        return <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" key={field}>{title(field)}</th>
                                    })}
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tools</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">

                            {crud.dataState ? entityContent.map((item, index) => {
                                return <tr className=" text-center p-4" key={index}>{item
                                    .map((elem, index) => {
                                        return <td className="p-4 " key={index}>{elem}</td>
                                    })}
                                    <td className="flex px-6 py-4 whitespace-nowrap">
                                        <svg onClick={() => handleDelete(deleteId[index])} className="w-6 h-6 mr-2 cursor-pointer" fill="none" stroke="Gray" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        <Link to={`/admin/${entityName}/edit`}>
                                            <svg onClick={() => handleEdit(deleteId[index])} className="w-6 h-6 cursor-pointer" stroke="Gray" fill="gray" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                                        </Link>
                                    </td>
                                </tr>
                            }) : <tr>is loading ...</tr>}

                        </tbody>
                    </table>
                </div>

            </div>
    }
}
export default Entity;