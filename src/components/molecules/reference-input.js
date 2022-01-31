import Select from 'react-select';
import { title } from 'case';
import { extractDataFromEntity } from '../../util/extract-data';
import LoadingPage from './loading-page';


const ReferenceInput = ({ name, reference, formValues, actionName }) => {
    const referenceData = extractDataFromEntity(reference);
    const selectBoxData = referenceData && Object.entries(referenceData);
    const values = [];
    let defaultValues = null;
    const options = selectBoxData.map(data => ({ "value": data[0], "label": data[1].title }));

    if (formValues) {
        if (Array.isArray(formValues[name])) {
            formValues[name].map(id => values.push(options.filter(option => option["value"] == id)[0]));
            if (values.length != 0) {
                defaultValues = values;
            }
        } else {
            defaultValues = []
        }
    }

    const showForm = defaultValues || actionName === "create" ;
    return <>
        {showForm ?
            <div key={name} className="w-6/12 flex flex-col justify-center">
                <label className="self-start">{title(name)}:</label>
                <Select className="basic-multi-select my-3 rounded-lg w-full "
                    classNamePrefix="select"
                    defaultValue={defaultValues}
                    isMulti
                    hasValue
                    closeMenuOnSelect={false}
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                            ...theme.colors,
                            primary25: 'neutral10',
                            primary: 'black',
                            primary50: 'neutral20'
                        },
                    })}
                    name={reference} options={options} >
                </Select>
            </div>
            : <LoadingPage />}

    </>
}

export default ReferenceInput;