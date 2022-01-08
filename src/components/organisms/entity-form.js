import { useNavigate } from "react-router";
import config from "../../util/config";
import { useCrud } from "../providers/crud.provider";
import { title } from 'case';
import TextInput from "../molecules/text-input";
import NumberInput from "../molecules/number-input";
import SelectBox from "../molecules/select-box";
import DateInput from "../molecules/date-input";
import ReferenceInput from "../molecules/reference-input";


const EntityForm = ({ entityName, actionName, editID, formValues }) => {
    const navigate = useNavigate();
    const crud = useCrud();

    const fields = Object.keys(config.entities[entityName].fields).map(field => {
        const { type, reference } = config.entities[entityName].fields[field];

        switch (type) {
            case "text":
                return <TextInput name={field} formValues={formValues} />
            case "number":
                return <NumberInput name={field} formValues={formValues} />
            case "select":
                return <SelectBox name={field} entityName={entityName} />
            case "date":
                return <DateInput name={field} formValues={formValues} />
            case "ref":
                return <ReferenceInput name={field} reference={reference} />
            default:
                return <p key={field}>field type for &quot;{field}&quot; not recognized</p>;
        }
    });

    const handleSubmit = (event) => {
        event.preventDefault()
        const form = new FormData(event.target)
        const values = Object.keys(config.entities[entityName].fields).map(field => {
            if ((form.getAll(field)) == [''] || (form.getAll(field))[0].length == 0) {
                alert(`Please fill out ${field}`)
                event.preventDefault()
                return null
            } else {
                return form.getAll(field)
            }

        })

        if (!values.includes(null)) {
            if (actionName === "create") {
                crud.Create(values, entityName);
            } else crud.Update(values, entityName, editID);
            navigate(`/admin/${entityName}/list`, { replace: true })

        } else return
    }


    return (
        <div className="min-h-screen min-w-full flex justify-center items-center">
            <form className="flex flex-col min-w-full  h-auto justify-center items-center  mx-20 my-32 rounded-lg" onSubmit={handleSubmit}>
                {fields}
                <button className="w-2/12 rounded-lg mt-10 transition-colors border-2 border-gray-400 text-white bg-black py-2 hover:text-gray-500" type="submit">{title(actionName)}</button>
            </form>
        </div>
    )
}

export default EntityForm;
