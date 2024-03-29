import config from './config';
import { initializeApp } from 'firebase/app';
import { browserLocalPersistence, browserPopupRedirectResolver, initializeAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const app = initializeApp(config.firebase);
export const database = getDatabase(app);
export const auth = initializeAuth(app, {
	persistence: browserLocalPersistence,
	popupRedirectResolver: browserPopupRedirectResolver,
});
