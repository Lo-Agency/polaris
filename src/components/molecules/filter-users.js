import Select from 'react-select';
import { extractDataFromEntity } from '../../util/extract-data';


const FilterUsers = ()=>{
    const groups = extractDataFromEntity("group")
    const options = groups && Object.entries(groups).map(group => ({ "value": group[0], "label": group[1]["title"] }))
    console.log(groups , "innnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
 return(
    <Select
    className="w-96 my-6 max-w-lg"
    classNamePrefix="select"
    closeMenuOnSelect={false}
    theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
            ...theme.colors,
            primary25: 'neutral10',
            primary: 'black',
            primary50: 'neutral20'
        }
    })}
    
    name={"groups"}
    options={options}
/>
 )
}

export default FilterUsers;