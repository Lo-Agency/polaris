import Select from 'react-select';
import { title } from 'case';
import { useCrud } from "../providers/crud.provider";

const ReferenceInput = ({ field, reference }) => {
    const crud = useCrud();

    let value = [];
    let label = [];
    let options = [];
    let selectvalues = [];
    let tempLabel = Object.values((Object.values(crud.dataState)).filter(item => (Object.keys(item)) == field)[0][field])
    tempLabel.map((item) => label.push(item.title))
    Object.keys((Object.values(crud.dataState)).filter(item => (Object.keys(item)) == field)[0][field]).map(item => value.push(item))
    for (let i = 0; i < value.length; i++) {
        options.push({ "value": value[i], "label": label[i] })
    }

    return (
        <div key={field} className=" w-6/12 flex flex-col justify-center px-8">
            <label className="mx-2 self-start">{title(field)}:
            </label>
            <Select className="basic-multi-select my-3 rounded-lg w-full "
                classNamePrefix="select"
                isMulti
                hasValue
                defaultValue={selectvalues}
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
    )
}

export default ReferenceInput;