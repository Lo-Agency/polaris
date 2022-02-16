import { useState } from 'react';
import LoadingPage from './loading-page';

const CheckBox = ({ name, formValues }) => {
	const [checked, setChecked] = useState(null);

	if (formValues && checked === null) {
		if (formValues[name] && formValues[name] === 'true') {
			setChecked(true);
		} else {
			setChecked(false);
		}
	}

	return (
		<>
			{checked !== null ? (
				<div key={name} className="w-6/12 flex items-start justify-center">
					<label className="self-start">{name}:</label>
					<input
						className="h-4 w-4 border border-gray-300 rounded-sm checked:bg-blue-600 checked:border-blue-600 cursor-pointer"
						type="checkbox"
						checked={checked}
						name={name}
						onChange={() => {
							setChecked(!checked);
						}}
						value={checked}
					/>
				</div>
			) : (
				<LoadingPage />
			)}
		</>
	);
};

export default CheckBox;
