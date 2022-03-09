import config from '../../util/config';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { title } from 'case';
import LoadingPage from './loading-page';
import { extractDataFromEntity } from '../../util/extract-data';
import { useCrud } from '../providers/crud.provider';

const SelectBox = ({ name, entityName, formValues, actionName }) => {
	const animatedComponents = makeAnimated();
	const crud = useCrud();
	const dataState = crud.dataState;
	const categories = extractDataFromEntity('category', dataState);

	let selectvalue;
	let categoryarray = [];
	if (config.entities[entityName].fields[name].value) {
		selectvalue = config.entities[entityName].fields[name].value;
	} else {
		Object.values(categories).map((x) => categoryarray.push(x['title']));
		selectvalue = categoryarray;
	}

	const selectOptions = selectvalue && selectvalue.map((option) => ({ value: option, label: option }));
	const defaultValue = formValues && selectOptions.filter((option) => option['value'] === formValues[name]);
	const showForm = defaultValue || actionName === 'create';

	return (
		<>
			{showForm ? (
				<div key={name} className="w-6/12 flex items-center flex-col justify-center">
					<label className="self-start">{title(name)}:</label>
					<Select
						className="basic-multi-select my-3 rounded-lg w-full "
						classNamePrefix="select"
						defaultValue={defaultValue}
						closeMenuOnSelect={true}
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
						components={animatedComponents}
						name={name}
						options={selectOptions}
					/>
				</div>
			) : (
				<LoadingPage />
			)}
		</>
	);
};

export default SelectBox;
