import { title, kebab } from 'case';
import { useEffect, useState } from 'react';

const SlugInput = ({ name, formValues }) => {
	const [slug, setSlug] = useState();
	useEffect(() => {
		const timeout = setTimeout(() => {
			if (formValues && !slug) {
				setSlug(formValues[name]);
			} else {
				setSlug(kebab(slug));
			}
		}, 1000);
		return () => {
			clearTimeout(timeout);
		};
	}, [slug]);
	return (
		<div key={name} className=" w-6/12 flex flex-col items-center justify-center">
			<label className="self-start">{title(name)}:</label>
			<input
				className="p-2 my-3 w-full rounded-none border-solid border-gray-300 border"
				name={name}
				type="text"
				onChange={(e) => setSlug(e.target.value)}
				value={slug}
				required
			/>
		</div>
	);
};

export default SlugInput;
