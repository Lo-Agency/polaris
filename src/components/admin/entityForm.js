import { useNavigate } from "react-router";
import config from "../../util/config";
import { useCrud } from "../providers/crud.provider";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { useEffect } from "react";
import { title } from 'case';


const EntittyForm = ({ entityName, actionName, editID, editData }) => {
    const navigate = useNavigate();
    const animatedComponents = makeAnimated();
    const crud = useCrud();
    
    const fields = Object.keys(config.entities[entityName].fields).map(field => {
        const { type, reference } = config.entities[entityName].fields[field];

        switch (type) {
            case "text":
                return <div key={field} className="w-full flex flex-col justify-center px-8">
                    <label className="mx-2">{title(field)}:
                    </label>
                    <input className="m-2 rounded-lg p-2 w-3/4" name={field} type="text" defaultValue={editData && editData[field]} />
                </div>
            case "number":
                return <div key={field} className=" w-full flex flex-col justify-center px-8">
                    <label className="mx-2">{title(field)}:
                    </label>
                    <input className="m-2 rounded-lg p-2 w-3/4" name={field} type="number" defaultValue={editData && editData[field]} />
                </div>
            case "date":
                return <div key={field} className=" w-full flex flex-col justify-center px-8">
                    <label className="mx-2">{title(field)}:
                    </label>
                    <input className="m-2 rounded-lg p-2 w-3/4" name={field} type="date" defaultValue={editData && editData[field]} />
                </div>
            case "ref":
                let value = [];
                let label = [];
                let options = [];

                let tempLabel = Object.values((Object.values(crud.dataState)).filter(item => (Object.keys(item)) == field)[0][field])

                tempLabel.map((item) => label.push(item.title))

                Object.keys((Object.values(crud.dataState)).filter(item => (Object.keys(item)) == field)[0][field]).map(item => value.push(item))

         
                for (let i = 0; i < value.length; i++) {
                    options.push({ "value": value[i], "label": label[i] })
                }
                return <Select className="basic-multi-select p-2 max-w-lg"
                    classNamePrefix="select"
                    isMulti
                    closeMenuOnSelect={false}
                    components={animatedComponents} name={reference} options={options}>
                </Select>
            default:
                return <p key={field}>field type for &quot;{field}&quot; not recognized</p>;
        }
    });

    const handleSubmit = (event) => {
        event.preventDefault()
        const form = new FormData(event.target)
        const values = Object.keys(config.entities[entityName].fields).map(field => {
            return form.getAll(field)
        })

        if (actionName === "create")
            crud.Create(values, entityName);
        else
            crud.Update(values, entityName, editID);
        navigate(`/admin/${entityName}/list`, { replace: true })
    }

    return (
        <>
            <form className="flex flex-col w-1/2" onSubmit={handleSubmit}>
                {fields}
                <button className="bg-lightblue w-2/3 rounded-lg transition-colors text-white m-2 mx-10 py-2 hover:bg-cyan" type="submit">{title(actionName)}</button>
            </form>
        </>
    )
}

export default EntittyForm;
