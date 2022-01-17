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


const EntityForm = ({ entityName, actionName, editID, formValues }) => {
    const navigate = useNavigate();
    const crud = useCrud();
    const [loading,setLoading]=useState(false);
    const entityFields =entityConfigFiels(entityName);

    const fields = entityFields.map(field => {
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

    const handleSubmit =async (event) => {
        setLoading(true)
        event.preventDefault()
        const form = new FormData(event.target)
        const values = entityFields.map(field => {
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
               await crud.insertNewItem(values, entityName);
               setLoading(false);
            } else{
                await crud.updateItem(values, entityName, editID);
                setLoading(false);
                }
            navigate(`/admin/${entityName}/list`, { replace: true })

        } else return
    }


    return (
        <div className="min-h-screen min-w-full flex justify-center items-center">
            <form className="flex flex-col min-w-full  h-auto justify-center items-center  mx-20 my-32 rounded-lg" onSubmit={handleSubmit}>
                {fields}
               <Button loading={loading} actionName={actionName}/>
            </form>
        </div>
    )
}

export default EntityForm;
