import Select from 'react-select';
import { title } from 'case';
import { extractDataFromEntity } from '../../util/extract-data';

const ReferenceInput = ({ name, reference }) => {
    const referenceData = extractDataFromEntity(reference);
    const selectBoxData = referenceData && Object.entries(referenceData);
    const options =selectBoxData && selectBoxData.map(data => ({ "value": data[0], "label": data[1].title }));

    return (
        <div key={name} className=" w-6/12 flex flex-col justify-center px-8">
            <label className="mx-2 self-start">{title(name)}:
            </label>
            <Select className="basic-multi-select my-3 rounded-lg w-full "
                classNamePrefix="select"
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
    )
}

export default ReferenceInput;