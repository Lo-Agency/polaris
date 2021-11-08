import { initializeApp } from 'firebase/app';
import { getDatabase } from '@firebase/database';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: 'https://todo-b7b5f-default-rtdb.firebaseio.com',
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

const appFirebase = initializeApp(firebaseConfig);
const db = getDatabase(appFirebase);
export default db;
