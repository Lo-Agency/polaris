import config from "../../util/config";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { title } from 'case';
import { useMemo } from "react";

const SelectBox = ({ name, entityName, formValues }) => {
    const animatedComponents = makeAnimated();
    const selectvalue = config.entities[entityName].fields[name].value;
    const selectOptions = selectvalue.map(option => ({ "value": option, "label": option }));

    const values = formValues ? selectOptions.filter(option => option["value"] == formValues[name][0]) : null;

    const createSelectBox = useMemo(() => {

        return <Select className="basic-multi-select my-3 rounded-lg w-full "
            classNamePrefix="select"
            defaultValue={values}
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
            components={animatedComponents} name={name} options={selectOptions}>
        </Select>
    }, [values]);

    return (
        <div key={name} className=" w-6/12 flex items-center flex-col justify-center px-8">
            <label className="mx-2 self-start">{title(name)}:
            </label>
            {createSelectBox}
        </div>

    );


}

export default SelectBox;