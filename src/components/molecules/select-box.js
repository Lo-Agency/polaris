import config from "../../util/config";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { title } from 'case';

const SelectBox = ({ name, entityName }) => {
    const animatedComponents = makeAnimated();
    let selectvalues = config.entities[entityName].names[name].value;
    let selectOptions = []
    
    selectvalues.map(selectValue=> selectOptions.push({ "value": selectvalues[i], "label": [selectvalues[i]] }))
    
    return (
        <div key={name} className=" w-6/12 flex items-center flex-col justify-center px-8">
            <label className="mx-2 self-start">{title(name)}:
            </label> <Select className="basic-multi-select my-3 rounded-lg w-full "
                classNamePrefix="select"
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
                components={animatedComponents} name={name} options={selectOptions}>
            </Select>
        </div>
    )
}

export default SelectBox;