import { getRedirectResult } from "@firebase/auth";
import { get } from "@firebase/database";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import EntittyForm from "../components/admin/entityForm";
import CrudProvider, { useCrud } from "../components/providers/crud.provider";
import config from "../util/config";



// {data? data
//     .map(item =>
//              Object.keys(item)
//         .map(elem =><li key={elem} >{elem} </li>))
//         :
//         <p>is loading...</p>

//     }




const Entity = () => {

    const { entityName, actionName } = useParams();
    const crud = useCrud();
    let data = crud.mydata;


    switch (actionName) {
        case "create":
        case "edit":
            return <><EntittyForm entityName={entityName} actionName={actionName} /> </>

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
                                return <td className="p-4 border-2 border-black" key={field}>{field}</td>
                            })}
                        </tr>
                        {data && console.log(data)}
                        {data && console.log(Object.values(data))}



                        {data ? Object.values(data)
                            .map((item, index) => {
                                return <tr className="p-4 border-2 border-black" key={index}>
                                    
                                    {data ? 
                                            Object.values(item)
                                                .map((elem,index) => <td className="p-4 border-2 border-black" key={index} >{elem} </td>)
                                        :
                                        <p>is loading...</p>
                                    }


                                </tr>
                            }) : <p> is Loading </p>}





                    </tbody>
                </table>
                {/* <ul>
                 {data? Object.values(data)
                     .map(item =>
                              Object.values(item)
                        .map(elem =><li key={elem} >{elem} </li>))
                        :
                     <p>is loading...</p>

                    }
                </ul> */}





                {/* <p>A table of all {entityName}s is going to be shown</p> */}
            </div>
            <div className="flex w-2/3 p-4 ">
                <Link className="px-2 py-2 m-2 rounded-lg bg-lightblue" to={`/admin/${entityName}/create`}>Create new {entityName}</Link>
                <Link className="px-2 py-2 m-2 rounded-lg bg-lightblue" to={`/admin/${entityName}/edit`}>Edit selected {entityName}</Link>
            </div>

        </div>;
    }


}

export default Entity;