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
		},
		"forgot-password": {
			pathname: "/forgot-password",
			isCaseSensitive: true,
			isProtected: false
		},
		signup: {
			pathname: "/signup",
			isCaseSensitive: true,
			isProtected: false
		},
	},

	entities: {
	
		roadmap: {
			fields: {
				title: {
					type: "text",
					isArray: false,
				},
				phase: {
					type: "ref",
					reference: "phase",
					isArray: true,
				},
				startingDate: {
					type: "date",
					isArray: false,
				},
			},
			list: ["phase"],
			readfields: {
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
				priority: {
					type: "text"
				},
				projects: {
					type: "text"
				},

			}
		},

		phase: {
			fields: {
				title: {
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
				}
			},
			list: ["learning", "project"]
		},

		learning: {
			fields: {
				title: {
					type: "text",
					isArray: false,
				},
				category: {
					type: "select",
					isArray: false,
					value: ["Frontend", "Backend", "General", "Soft Skills"]
				},
				resources: {
					type: "text",
					isArray: false,
				},
				priority: {
					type: "select",
					isArray: false,
					value: ["Low", "Medium", "High"]
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
					type: "select",
					isArray: false,
					value: ["Real", "Team", "Personal", "Optional"]
				},
				learningDay: {
					type: "number",
					isArray: false,

				}
			}
		},
		group: {
			fields: {
				title: {
					type: "text",
					isArray: false
				},
				description: {
					type: "text",
					isArray: false
				},
				slug: {
					type: "text",
					isArray: false
				},
				roadmap: {
					type: "ref",
					reference: "roadmap",
					isArray: true
				}
			},
			list:["roadmap"]

		},
		user: {
			fields: {
				email: {
					type: "text",
					isArray: false
				},
				isApproved: {
					type: "text",
					isArray: false
				},
				group: {
					type: "ref",
					reference: "group",
					isArray: true,
				},
				
			},
			list: ["group"]
		},

	}
};