import Select from 'react-select';
import { title } from 'case';
import { useCrud } from "../providers/crud.provider";

const ReferenceInput = ({ name, reference }) => {
    const crud = useCrud();
    let options = [];
    let selectvalues = [];

    const referenceData = crud.dataState.filter(item=> Object.keys(item)==reference)
    const selectBoxData = Object.entries(Object.values(referenceData[0])[0])
    selectBoxData.map(data=> {
        options.push({"value": data[0], "label":data[1].title})
    })

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