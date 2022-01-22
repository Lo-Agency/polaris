import Select from 'react-select';
import { title } from 'case';
import { extractDataFromEntity } from '../../util/extract-data';
import { useMemo } from 'react';

const ReferenceInput = ({ name, reference, formValues, actionName }) => {
    const referenceData = extractDataFromEntity(reference);
<<<<<<< HEAD
    const selectBoxData = referenceData && Object.entries(referenceData);
    const options =selectBoxData && selectBoxData.map(data => ({ "value": data[0], "label": data[1].title }));
=======
    const selectBoxData = Object.entries(referenceData);

    const options = selectBoxData.map(data => ({ "value": data[0], "label": data[1].title }));
   

    const createSelectBox = useMemo(()=>{
        const defaultValue = !formValues
        ? null
        : formValues[name].map(id => options.filter(option => option["value"] == id)[0]);
>>>>>>> bec552aca4be5c4ac350253353618910d830bb8a

        return(
            <Select className="basic-multi-select my-3 rounded-lg w-full "
                    classNamePrefix="select"
                    value={defaultValue}
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
        )
    },[formValues])
   
        return (
            <div key={name} className=" w-6/12 flex flex-col justify-center px-8">
                <label className="mx-2 self-start">{title(name)}:
                </label>
                {createSelectBox}
            </div>
        )
  
}

export default ReferenceInput;