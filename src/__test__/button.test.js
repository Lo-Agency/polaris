import React from 'react';
import { render } from '@testing-library/react';

import Button from '../components/atoms/button';

describe('Button component', () => {
	it('it should render snapshot button component', () => {
		const { asFragment } = render(<Button />);
		expect(asFragment(<Button />)).toMatchSnapshot();
	});
});
