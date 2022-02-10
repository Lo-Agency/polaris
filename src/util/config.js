import * as yup from 'yup';

export default {
	firebase: {
		apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
		authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
		projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
		storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
		messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
		appId: process.env.REACT_APP_FIREBASE_APP_ID,
	},
	routes: {
		home: {
			pathname: '/',
			isCaseSensitive: false,
			isProtected: true,
		},
		login: {
			pathname: '/login',
			isCaseSensitive: false,
			isProtected: false,
		},
		entity: {
			pathname: '/admin/:entityName/:actionName',
			isCaseSensitive: true,
			isProtected: true,
		},
		admin: {
			pathname: '/admin',
			isCaseSensitive: true,
			isProtected: true,
		},
		'forgot-password': {
			pathname: '/forgot-password',
			isCaseSensitive: true,
			isProtected: false,
		},
		signup: {
			pathname: '/signup',
			isCaseSensitive: true,
			isProtected: false,
		},
	},

	entities: {
		roadmap: {
			fields: {
				title: {
					type: 'text',
					isArray: false,
					validate: yup.string().required(),
				},
				phase: {
					type: 'ref',
					reference: 'phase',
					isArray: true,
					validate: yup.array().required(),
				},
				startingDate: {
					type: 'date',
					isArray: false,
					validate: yup.date().required(),
				},
			},

			list: ['phase'],
			readfields: {
				duration: {
					type: 'text',
				},
				topic: {
					type: 'text',
				},
				category: {
					type: 'text',
				},
				resources: {
					type: 'text',
				},
				priority: {
					type: 'text',
				},
				projects: {
					type: 'text',
				},
			},
		},

		phase: {
			fields: {
				title: {
					type: 'text',
					required: true,
					isArray: false,
					validate: yup.string().required(),
				},

				learning: {
					type: 'ref',
					isArray: true,
					reference: 'learning',
					validate: yup.array().required(),
				},
				project: {
					type: 'ref',
					isArray: true,
					reference: 'project',
					validate: yup.array().required(),
				},
			},

			list: ['learning', 'project'],
		},

		learning: {
			fields: {
				title: {
					type: 'text',
					isArray: false,
					validate: yup.string().required(),
				},
				category: {
					type: 'select',
					isArray: false,
					value: ['Frontend', 'Backend', 'General', 'Soft Skills'],
					validate: yup.string().required(),
				},
				resources: {
					type: 'text',
					isArray: false,
					validate: yup.string().required(),
				},
				priority: {
					type: 'select',
					isArray: false,
					value: ['Low', 'Medium', 'High'],
					validate: yup.string().required(),
				},
			},
		},

		project: {
			fields: {
				title: {
					type: 'text',
					isArray: false,
					validate: yup.string().required(),
				},
				days: {
					type: 'number',
					isArray: false,
					validate: yup.number().required(),
				},
				projectType: {
					type: 'select',
					isArray: false,
					value: ['Real', 'Team', 'Personal', 'Optional'],
					validate: yup.string().required(),
				},
				learningDay: {
					type: 'number',
					isArray: false,
					validate: yup.number().required(),
				},
			},
		},
		group: {
			fields: {
				title: {
					type: 'text',
					isArray: false,
					validate: yup.string().required(),
				},
				description: {
					type: 'text',
					isArray: false,
					validate: yup.string().required(),
				},
				slug: {
					type: 'text',
					isArray: false,
					validate: yup.string().required(),
				},
				roadmap: {
					type: 'ref',
					reference: 'roadmap',
					isArray: true,
					validate: yup.array().required(),
				},
			},

			list: ['roadmap'],
		},
		user: {
			fields: {
				email: {
					type: 'text',
					isArray: false,
					validate: yup.string().email().required(),
				},
				group: {
					type: 'ref',
					reference: 'group',
					isArray: true,
					validate: yup.array(),
				},
				type: {
					type: 'select',
					isArray: false,
					value: ['admin', 'user'],
					validate: yup.string().required(),
				},
				isApproved: {
					type: 'boolean',
					isArray: false,
					validate: yup.boolean(),
				},
			},
			list: ['group'],
		},
	},
};
