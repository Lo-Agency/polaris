import config from '../../util/config';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { title } from 'case';
import { useMemo, useState } from 'react';

const SelectBox = ({ name, entityName, formValues }) => {
	const animatedComponents = makeAnimated();
	const selectvalue = config.entities[entityName].fields[name].value;
	const selectOptions = selectvalue.map((option) => ({ value: option, label: option }));
    const [item,setItem]= useState(null);
    
	const createSelectBox = useMemo(() => {
		const defaultValue = !formValues
			? null
			: selectOptions.filter((option) => option['value'] == formValues[name][0]).pop();
        setItem(defaultValue)

		return (
			<Select
				className="basic-multi-select my-3 rounded-lg w-full "
				classNamePrefix="select"
				defaultValue={item}
                onChange={(e)=>{setItem(e)}}
				closeMenuOnSelect={false}
				theme={(theme) => ({
					...theme,
					borderRadius: 0,
					colors: {
						...theme.colors,
						primary25: '#C0C0C0',
						primary50: '#C0C0C0',
						primary: 'black',
					}
				})}
				components={animatedComponents}
				name={name}
				options={selectOptions}
			/>
		);
	}, [formValues]);

	return (
		<div key={name} className="w-6/12 flex items-center flex-col justify-center">
			<label className="self-start">{title(name)}:</label>
			{createSelectBox}
		</div>
	);
};

export default SelectBox;
