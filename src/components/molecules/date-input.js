import { title } from 'case';

const DateInput = ({ name, formValues }) => {
	return (
		<div key={name} className="w-6/12 flex item-center flex-col justify-center">
			<label className="self-start">{title(name)}:</label>
			<input
				className="p-2 my-3 mt-2 w-full bg-white border-solid border-gray-300 border"
				name={name}
				type="date"
				defaultValue={formValues && formValues[name]}
				required
			/>
		</div>
	);
};

export default DateInput;
