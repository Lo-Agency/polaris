import React from 'react';
import { render } from '@testing-library/react';

import NotFound from '../pages/not-found';

describe('Not found component', () => {
	it('it should render notfound component', () => {
		render(<NotFound />);
	});
});
