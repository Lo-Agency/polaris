import { useNavigate } from 'react-router';
import config from '../../util/config';
import { useCrud } from '../providers/crud.provider';
import TextInput from '../molecules/text-input';
import NumberInput from '../molecules/number-input';
import SelectBox from '../molecules/select-box';
import DateInput from '../molecules/date-input';
import ReferenceInput from '../molecules/reference-input';
import { entityConfigFiels } from '../../util/extract-data';
import { useState } from 'react';
import Button from '../atoms/button';
import CheckBox from '../molecules/check-box';
import * as yup from 'yup';
import EmailInput from '../molecules/email-input';

const EntityForm = ({ entityName, actionName, editID, formValues }) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const crud = useCrud();
	const entityFields = entityConfigFiels(entityName);
	const validations = [];
	const fields = entityFields.map((field) => {
		const { type, reference } = config.entities[entityName].fields[field];

		switch (type) {
			case 'text':
				return <TextInput name={field} key={field} formValues={formValues} />;
			case 'email':
				return <EmailInput name={field} key={field} formValues={formValues} />;
			case 'number':
				return <NumberInput name={field} key={field} formValues={formValues} />;
			case 'select':
				return (
					<SelectBox name={field} key={field} entityName={entityName} formValues={formValues} actionName={actionName} />
				);
			case 'date':
				return <DateInput name={field} key={field} formValues={formValues} />;
			case 'ref':
				return (
					<ReferenceInput
						name={field}
						key={field}
						reference={reference}
						formValues={formValues}
						actionName={actionName}
					/>
				);
			case 'boolean':
				return <CheckBox name={field} key={field} formValues={formValues} />;
			default:
				return <p key={field}>field type for &quot;{field}&quot; not recognized</p>;
		}
	});

	const formValidation = async (value, field) => {
		let schema = yup.object().shape({ [field]: config.entities[entityName].fields[field].validate });

		const isValid = await schema.isValid({ [field]: value });
		if (!isValid) {
			setError(`${field} is not valid!`);
		}
		validations.push(isValid);
	};

	const handleSubmit = async (event) => {
		const form = new FormData(event.target);
		let values = {};
		setError(null);
		setLoading(true);
		event.preventDefault();

		for (const field of entityFields) {
			if (config.entities[entityName].fields[field].isArray) {
				if (!form.getAll(field).includes('')) {
					values[field] = form.getAll(field);
				}
			} else {
				if (config.entities[entityName].fields[field].type === 'boolean') {
					values[field] = `${Boolean(form.getAll(field)[0])}`;
				} else {
					values[field] = form.getAll(field)[0];
				}
			}
			await formValidation(values[field], field);
		}

		if (!validations.includes(false)) {
			if (actionName === 'create') {
				await crud.insertNewItem(values, entityName);
			} else {
				await crud.updateItem(values, entityName, editID);
			}
			setLoading(false);
			navigate(`/admin/${entityName}/list`, { replace: true });
			return;
		}
		setLoading(false);
	};

	return (
		<div className="flex justify-center items-center left-60 right-0 mx-5 top-20 flex-col absolute">
			<form className="flex flex-col h-auto justify-center items-center w-5/6 mt-10" onSubmit={handleSubmit}>
				{fields}
				<Button
					className={'w-2/12 mt-10 flex justify-center items-center transition-colors text-white bg-black py-2'}
					loading={loading}
					actionName="Save"
				/>
				{error ? (
					<div className="flex items-center text-red-500 text-sm font-bold px-4 pt-3" role="alert">
						<p>{error}</p>
					</div>
				) : null}
			</form>
		</div>
	);
};

export default EntityForm;
