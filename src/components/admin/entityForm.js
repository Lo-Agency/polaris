import { useNavigate } from "react-router";
import config from "../../util/config";
import { useCrud } from "../providers/crud.provider";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { title } from 'case';


const EntittyForm = ({ entityName, actionName, editID, editData }) => {
    const navigate = useNavigate();
    const animatedComponents = makeAnimated();
    const crud = useCrud();

    const fields = Object.keys(config.entities[entityName].fields).map(field => {
        const { type, reference } = config.entities[entityName].fields[field];


        switch (type) {
            case "text":
                return <div key={field} className="w-full flex flex-col justify-center px-8 ">
                    <label className="mx-2">{title(field)}:
                    </label>
                    <input className="m-2 rounded-lg p-2 w-1/2 border-2 border-gray-400" name={field} type="text" defaultValue={editData && editData[field]} required/>
                </div>
            case "number":
                return <div key={field} className=" w-full flex flex-col justify-center px-8">
                    <label className="mx-2">{title(field)}:
                    </label>
                    <input className="m-2 rounded-lg p-2 w-2/4 border-2 border-gray-400" name={field} type="number" defaultValue={editData && editData[field]} required/>
                </div>
            case "select":
                let selectOptions = []
                let selectvalue = config.entities[entityName].fields[field].value
                for (let i = 0; i < selectvalue.length; i++) {
                    selectOptions.push({ "value": selectvalue[i], "label": [selectvalue[i]] })
                }
                return <div key={field} className=" w-full flex flex-col justify-center px-8">
                    <label className="mx-2">{title(field)}:
                    </label> <Select className="basic-multi-select w-1/2 p-2 max-w-lg"
                        classNamePrefix="select"
                        hasValue
                        closeMenuOnSelect={false}
                        components={animatedComponents} name={field} options={selectOptions}>
                    </Select>
                </div>
            case "date":
                return <div key={field} className=" w-full flex flex-col justify-center px-8 ">
                    <label className="mx-2">{title(field)}:
                    </label>
                    <input className="m-2 rounded-lg p-2 w-1/2 border-2 border-gray-400" name={field} type="date" defaultValue={editData && editData[field]} required/>
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
                return <div key={field} className=" w-full flex flex-col justify-center px-8">
                    <label className="mx-2">{title(field)}:
                    </label>
                <Select className="basic-multi-select w-1/2 p-2 max-w-lg"
                    classNamePrefix="select"
                    isMulti
                    hasValue
                    closeMenuOnSelect={false}
                    components={animatedComponents} name={reference} options={options} >
                </Select>
                </div>
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
            <form className="flex flex-col w-full  h-4/6  shadow overflow-hidden border-b border-gray-200 mx-20 my-32 rounded-lg" onSubmit={handleSubmit}>
                {fields}
                <button className="w-2/12 rounded-lg transition-colors border-2 border-gray-400 text-white bg-black m-2 mx-10 py-2 hover:text-gray-500" type="submit">{title(actionName)}</button>
            </form>
        </>
    )
}

export default EntittyForm;
