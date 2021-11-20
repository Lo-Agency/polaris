import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import config from "../../util/config";
import { useCrud } from "../providers/crud.provider";


const EntittyForm = ({ entityName, actionName, editID, editData }) => {
    
   // const navigate = useNavigate();
    //const location = useLocation();
   //const from = location.state?.from?.pathname || "/";
    const crud = useCrud();
    const fields = Object.keys(config.entities[entityName].fields).map(field => {
        const { type, reference } = config.entities[entityName].fields[field];

        switch (type) {
            case "text":
                return <div key={field} className="w-full flex flex-col justify-center px-8">
                    <label className="mx-2">{field}:
                    </label>
                    <input className="m-2 rounded-lg p-2 w-3/4" name={field} type="text" defaultValue= {editData && editData[field]}/>
                </div>
            case "number":
                return <div key={field} className=" w-full flex flex-col justify-center px-8">
                    <label className="mx-2">{field}:
                    </label>
                    <input className="m-2 rounded-lg p-2 w-3/4" name={field} type="number"  defaultValue= {editData && editData[field]}/>
                </div>
            case "ref":
                return <p key={field}>field {field} is referencing to {reference}</p>

            default:
                return <p key={field}>field type for &quot;{field}&quot; not recognized</p>;
        }
    });

    const handleSubmit = (event) => {
        event.preventDefault()
        const form = new FormData(event.target)
        const values = Object.keys(config.entities[entityName].fields).map(field => {
            return form.get(field)
        })

        if (actionName === "create")
        
            crud.Create(values, entityName);
            //, () => navigate(`/admin/${entityName}/list`, { replace: true })  
        else
            crud.Update(values, entityName, editID);
            console.log(values, "entityform values")
            //navigate(`/admin/${entityName}/${editID}`, { replace: true })

    }

    return (
        <>
            <form className="flex flex-col w-1/2" onSubmit={handleSubmit}>
                {fields}
                <button className="bg-lightblue w-2/3 rounded-lg text-white m-2 mx-10 py-2" type="submit">{actionName}</button>
                
            </form>
        </>
    )
}

export default EntittyForm;
