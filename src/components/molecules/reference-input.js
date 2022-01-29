import Select from 'react-select';
import { title } from 'case';
import { extractDataFromEntity } from '../../util/extract-data';
import { useMemo } from 'react';

const ReferenceInput = ({ name, reference, formValues, actionName }) => {
    const referenceData = extractDataFromEntity(reference);
    const selectBoxData = referenceData && Object.entries(referenceData);

    const options = selectBoxData && selectBoxData.map(data => ({ "value": data[0], "label": data[1].title }));

    const createSelectBox = useMemo(() => {
        const defaultValue = formValues
            ? formValues[name] && formValues[name].map(id => options.filter(option => option["value"] == id)[0])
            : null;

        return (
            <Select className="basic-multi-select my-3 rounded-lg w-full "
                classNamePrefix="select"
                defaultValue={defaultValue}
                isMulti
                hasValue
                closeMenuOnSelect={false}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                        ...theme.colors,
                        primary25: '#C0C0C0',
                        primary50: '#C0C0C0',
                        primary: 'black',
                    },
                })}
                name={reference} options={options} >
            </Select>
        )
    }, [formValues])

    return (
        <div key={name} className="w-6/12 flex flex-col justify-center">
            <label className="self-start">{title(name)}:</label>
            {createSelectBox}
        </div>
    )
}

export default ReferenceInput;