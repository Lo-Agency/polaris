import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './components/providers/auth.provider';

Sentry.init({
	dsn: process.env.REACT_APP_DSN_URL,
	integrations: [new Integrations.BrowserTracing()],
	tracesSampleRate: 1.0,
});

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<App />
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root'),
);
