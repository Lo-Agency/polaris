import { useNavigate } from "react-router";
import config from "../../util/config";
import { useCrud } from "../providers/crud.provider";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';


const EntittyForm = ({ entityName, actionName, editID, editData }) => {
    const navigate = useNavigate();
    const animatedComponents = makeAnimated();
    const crud = useCrud();
    const fields = Object.keys(config.entities[entityName].fields).map(field => {
        const { type, reference } = config.entities[entityName].fields[field];

        switch (type) {
            case "text":
                return <div key={field} className="w-full flex flex-col justify-center px-8">
                    <label className="mx-2">{field}:
                    </label>
                    <input className="m-2 rounded-lg p-2 w-3/4" name={field} type="text" defaultValue={editData && editData[field]} />
                </div>
            case "number":
                return <div key={field} className=" w-full flex flex-col justify-center px-8">
                    <label className="mx-2">{field}:
                    </label>
                    <input className="m-2 rounded-lg p-2 w-3/4" name={field} type="number" defaultValue={editData && editData[field]} />
                </div>
            case "ref":
                let value = [];
                let label = [];
                let options = [];
                console.log(crud[reference], "crud.reference")

                crud[reference] && Object.values(crud[reference]).map((item, index) => {
                    value.push(Object.keys(crud[reference])[index]), label.push(item.title)

                })

                for (let i = 0; i < value.length; i++) {
                    options.push({ "value": value[i], "label": label[i] })
                }
                console.log(options, "options");


                return <Select className="basic-multi-select"
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
                <button className="bg-lightblue w-2/3 rounded-lg text-white m-2 mx-10 py-2" type="submit">{actionName}</button>

            </form>
        </>
    )
}

export default EntittyForm;
