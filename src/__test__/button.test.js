import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '../components/atoms/button';
import '@testing-library/jest-dom/extend-expect';

describe('Button component', () => {
	it('it should render snapshot button component', () => {
		const { asFragment } = render(<Button />);
		expect(asFragment(<Button />)).toMatchSnapshot();
	});

	it('calling render with the same component on the same container does not remount', () => {
		const { rerender } = render(<Button className={'btn-form flex justify-center items-center'} actionName={'Login'} />)
		expect(screen.getByTestId('btn-form').textContent).toBe('Login')
		// re-render the same component with different props
		rerender(<Button className={'w-2/12 mt-10 mb-8 flex justify-center items-center transition-colors text-white bg-black py-2'} actionName={'Save'} />)
		expect(screen.getByTestId('btn-form').textContent).toBe('Save')
	})
});
