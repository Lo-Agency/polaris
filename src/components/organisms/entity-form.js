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
import { title } from "case";
import Button from "../atoms/button";
import CheckBox from "../molecules/check-box";
import * as yup from 'yup';

const EntityForm = ({ entityName, actionName, editID, formValues }) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
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

    const formValidation = async (values) => {
        let schema = yup.object().shape(config.entities[entityName].validation)

        const isValid = await schema.isValid(values)
        if (!isValid) {
            setError(`Inputs are not valid!`)
        }
        return isValid
    }

    const handleSubmit = async (event) => {
        const form = new FormData(event.target)
        let values = {}
        setError(null)
        setLoading(true)
        event.preventDefault()

        entityFields.forEach((field) => {
            if (config.entities[entityName].fields[field].isArray) {
                if (!form.getAll(field).includes("")) {
                    values[`${field}`] = form.getAll(field)
                }
            } else {
                values[`${field}`] = form.getAll(field)[0]
            }
        })

        const valid = await formValidation(values)

        if (valid) {
            if (actionName === "create") {
                await crud.insertNewItem(values, entityName);
            } else {
                await crud.updateItem(values, entityName, editID);
            }
            setLoading(false);
            navigate(`/admin/${entityName}/list`, { replace: true })
            return
        }
        setLoading(false)
    }

    return (
        <div className="top-0 absolute right-0 w-5/6">
            <form className="flex flex-col h-auto justify-center items-center w-5/6 mt-40"
                onSubmit={handleSubmit}>
                {fields}
                {error ?
                    <div className="flex items-center text-red-500 text-sm font-bold px-4 pt-3" role="alert">
                        <p>{error}</p>
                    </div>
                    : null}
                <Button loading={loading} actionName={actionName} />
            </form>
        </div>
    )
}

export default EntityForm;
