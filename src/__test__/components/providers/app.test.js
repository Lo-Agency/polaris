const AuthProvider = require('../../../components/providers/auth.provider');
// import { test1 } from '../../../components/providers/auth.provider'
// const test1 = require('../../../components/providers/auth.provider')
describe('test', () => {
	test('Adds 2 + 2 to equal 4', () => {
		const result = AuthProvider.test(10, 2);
		expect(result).toBe(true);
	});
});
// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from '../../../App';

// it('renders welcome message', () => {
//   render(<App />);
//   expect(screen.getByText('Learn React')).toBeInTheDocument();
// });
