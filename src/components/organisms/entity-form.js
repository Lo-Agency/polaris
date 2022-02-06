import { useNavigate } from "react-router";
import config from "../../util/config";
import { useCrud } from "../providers/crud.provider";
import TextInput from "../molecules/text-input";
import NumberInput from "../molecules/number-input";
import SelectBox from "../molecules/select-box";
import DateInput from "../molecules/date-input";
import ReferenceInput from "../molecules/reference-input";
import { entityConfigFiels } from "../../util/extract-data";
import { useState } from "react";
import Button from "../atoms/button";
import CheckBox from "../molecules/check-box";


const EntityForm = ({ entityName, actionName, editID, formValues }) => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const crud = useCrud();
    const entityFields = entityConfigFiels(entityName);

    const fields = entityFields.map(field => {
        const { type, reference } = config.entities[entityName].fields[field];

        switch (type) {
            case "text":
                return <TextInput name={field} key={field} formValues={formValues} />
            case "number":
                return <NumberInput name={field} key={field} formValues={formValues} />
            case "select":
                return <SelectBox name={field} key={field} entityName={entityName} formValues={formValues} actionName={actionName} />
            case "date":
                return <DateInput name={field} key={field} formValues={formValues} />
            case "ref":
                return <ReferenceInput name={field} key={field} reference={reference} formValues={formValues} actionName={actionName} />
            case "boolean":
                return <CheckBox name={field} key={field} formValues={formValues} />
            default:
                return <p key={field}>field type for &quot;{field}&quot; not recognized</p>;
        }
    });
    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault()
        const form = new FormData(event.target)
        const values = entityFields.map(field => {
            if (config.entities[entityName].fields[field].isArray) {
                return form.getAll(field)
            }
            return form.getAll(field)[0]
        })

        if (!values.includes(null)) {
            if (actionName === "create") {
                await crud.insertNewItem(values, entityName);
                setLoading(false);
            } else {
                await crud.updateItem(values, entityName, editID);
                setLoading(false);
            }
            navigate(`/admin/${entityName}/list`, { replace: true })

        } return
    }


    return (
        <div className="top-0 absolute right-0 w-5/6">
            <form className="flex flex-col h-auto justify-center items-center w-5/6 mt-40"
                onSubmit={handleSubmit}>
                {fields}
                <Button style={"w-2/12 mt-10 flex justify-center items-center transition-colors text-white bg-black py-2 hover:text-gray-500"} loading={loading} actionName={actionName} />
            </form>
        </div>
    )
}

export default EntityForm;
