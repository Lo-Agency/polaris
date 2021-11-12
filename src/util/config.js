export default {
	firebase: {
		apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
		authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
		projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
		storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
		messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
		appId: process.env.REACT_APP_FIREBASE_APP_ID
	},
    routes: {
		home: {
			pathname: "/",
			isCaseSensitive: false,
			isProtected: false
		},
		login: {
			pathname: "/login",
			isCaseSensitive: false,
			isProtected: false
		},
		admin: {
			pathname: "/admin",
			isCaseSensitive: false,
			isProtected: true
		},
		newlearning: {
			pathname: "/newlearning",
			isCaseSensitive: false,
			isProtected: true
		},
        newphase: {
			pathname: "/newphase",
			isCaseSensitive: false,
			isProtected: true
		},
        newproject: {
			pathname: "/newproject",
			isCaseSensitive: false,
			isProtected: true
		},
	
	}
};