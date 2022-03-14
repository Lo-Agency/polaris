import React from 'react';
import Accordion from './Accordion';

const Test = () => {
	const data = [
		{
			title: 'How much do i need to pay for this?',
			content: ['workspace 1', 'work2'],
		},
		{
			title: 'Can i delete my account?',
			content:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit nesciunt beatae debitis delectus pariatur nostrum maiores magni quibusdam officia tempore quis ea molestiae ducimus error nemo, tenetur possimus, earum illo. Impedit nesciunt beatae debitis delectus pariatur nostrum maiores magni quibusdam officia tempore quis ea molestiae ducimus error nemo, tenetur possimus, earum illo.',
		},
		{
			title: 'Is this accordion styled in Tailwind css?',
			content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		},
	];
	return (
		<div className="container mx-auto">
			{data.map((item) => (
				<Accordion key={item} title={item.title} content={item.content} />
			))}
		</div>
	);
};

export default Test;
