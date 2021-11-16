import { useParams } from "react-router";
import { Link } from "react-router-dom";
import EntittyForm from "../components/admin/entityForm";



const Entity = () => {

    const { entityName, actionName } = useParams();

    switch (actionName) {
        case "create":
            return <><EntittyForm entityName={entityName} /> </>

        case "edit":
            return <><EntittyForm entityName={entityName} /> </>

        case "remove":
            return <> <EntittyForm entityName={entityName} /> </>
        //list all the items for the firebase
        default: return <div className="flex h-full justify-between items-start  w-11/12 border-4 border-gray-900 flex-col" >
            <div className="flex w-full justify-center h-5/6 items-center" >
           <p>A table of all {entityName}s is going to be shown</p>
           </div>
            <div className="flex w-2/3 p-4 ">
                <Link className="px-2 py-2 m-2 rounded-lg bg-lightblue" to={`/admin/${entityName}/create`}>Create new {entityName}</Link>
                <Link className="px-2 py-2 m-2 rounded-lg bg-lightblue" to={`/admin/${entityName}/edit`}>Edit selected {entityName}</Link>
            </div>
           
        </div>;
    }


}

export default Entity;