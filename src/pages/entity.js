import { useParams } from "react-router";
import { Link } from "react-router-dom";
import EntittyForm from "../components/admin/entityForm";



const Entity = () => {

    const { entityName, actionName } = useParams();

    switch (actionName) {
        case "create":
            return <><EntittyForm entityName={entityName}/> </>

        case "edit":
            return <><EntittyForm entityName={entityName}/> </>

        case "remove":
            return <> <EntittyForm entityName={entityName}/> </>
        //list all the items for the firebase
        default:return <>
        <Link to={`/admin/${entityName}/create`}>Create new {entityName}</Link>{" - "}
        <Link to={`/admin/${entityName}/edit`}>Edit selected {entityName}</Link>
            <p>A table of all {entityName}s is going to be shown</p>
        </>;
    }

    
}

export default Entity;