import Select from 'react-select';
import { title } from 'case';
import { useCrud } from "../providers/crud.provider";

const ReferenceInput = ({ name, reference }) => {
    const crud = useCrud();
    let value = [];
    let label = [];
    let options = [];
    let selectvalues = [];

    let referenceData = crud.dataState.filter(item=> Object.keys(item)==reference)
    const selectBoxData = Object.entries(Object.values(referenceData[0])[0])
    selectBoxData.map(data=> {
        value.push(data[0]);
        label.push(data[1].title);
    })
  
    for (let i = 0; i < value.length; i++) {
        options.push({ "value": value[i], "label": label[i] })
    }

    return (
        <div key={name} className=" w-6/12 flex flex-col justify-center px-8">
            <label className="mx-2 self-start">{title(name)}:
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