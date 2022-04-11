import React from 'react';
import { render } from '@testing-library/react';

import Button from './button';

describe('Button component', () => {
	it('snapshot button component', () => {
		const { asFragment } = render(<Button />);
		expect(asFragment(<Button />)).toMatchSnapshot();
	});
});
