

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
		entity: {
			pathname: '/admin/:entityName/:actionName',
			isCaseSensitive: true,
			isProtected: true
		},
		admin: {
			pathname: "/admin",
			isCaseSensitive: true,
			isProtected: true
		}

	},

	entities: {
		phase: {
			fields: {
				title :{
					type: "text",
					required: true,
					isArray: false,
				},

				learning: {
					type: "ref",
					isArray: true,
					reference: "learning"
				},
				project: {
					type: "ref",
					isArray: true,
					reference: "project"
				},
				label:{
					type:"text",
					isArray: false
				}
			},
			list : ["title", "learning", "project"]
		},

		learning: {
			fields: {
				title: {
					type: "text",
					isArray: false,
				},
				category: {
					type: "text",
					isArray: false,
				},
				resources: {
					type: "text",
					isArray: false,
				},
				learningType: {
					type: "text",
					isArray: false,
				}
			}
		},

		project: {
			fields: {
				title: {
					type: "text",
					isArray: false,
				},
				days: {
					type: "number",
					isArray: false,
				},
				projectType: {
					type: "text",
					isArray: false,
				},
				learningDay: {
					type:"number",
					isArray: false,
				}
			}
		},
		roadmap: {
			fields: {
				title:{
					type : "text",
					isArray: false,
				},
				phase: {
					type:"ref",
					reference: "phase",
					isArray: true,
				},
				startingDate: {
					type:"date",
					isArray: false,
				}

			},
			readfields:{
				duration: {
					type: "text"
				},
				topic: {
					type: "text"
				},
				category: {
					type: "text"
				},
				resources: {
					type: "text"
				},
				projects: {
					type: "text"
				},
				
			}

		}
	}
};