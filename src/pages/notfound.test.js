import React from 'react';
import { render } from '@testing-library/react';

import NotFound from './not-found';

describe('Not found component', () => {
	it('render not found', () => {
		render(<NotFound />);
	});
});
