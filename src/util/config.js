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
		test: {
			pathname: '/test',
			isCaseSensitive: false,
			isProtected: false,
		},
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
		workspace: {
			pathname: '/:workspaceId',
			isCaseSensitive: true,
			isProtected: true,
		},
		entity: {
			pathname: '/:workspaceId/:entityName/:actionName',
			isCaseSensitive: true,
			isProtected: true,
		},
		// admin: {
		// 	pathname: '/admin',
		// 	isCaseSensitive: true,
		// 	isProtected: true,
		// },
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
		'lesson-category': {
			fields: {
				title: {
					type: 'text',
					isArray: false,
					validate: yup.string().required(),
				},
				slug: {
					type: 'text',
					isArray: false,
					validate: yup.string().required(),
				},
			},
		},

		lesson: {
			fields: {
				title: {
					type: 'text',
					isArray: false,
					validate: yup.string().required(),
				},
				'lesson-category': {
					type: 'ref',
					isArray: true,
					reference: 'lesson-category',
					validate: yup.array().required(),
				},
				resources: {
					type: 'text',
					isArray: false,
					validate: yup.string().required(),
				},
				duration: {
					type: 'number',
					isArray: false,
					validate: yup.number().min(1).required(),
				},
				priority: {
					type: 'select',
					isArray: false,
					value: ['High', 'Medium', 'Low'],
					validate: yup.string().required(),
				},
				dependency: {
					type: 'ref',
					isArray: true,
					reference: 'lesson',
					validate: yup.array(),
				},
			},
			list: ['lesson-category'],
		},
		'target-type': {
			fields: {
				title: {
					type: 'text',
					isArray: false,
					validate: yup.string().required(),
				},
				slug: {
					type: 'text',
					isArray: false,
					validate: yup.string().required(),
				},
			},
		},

		target: {
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
				duration: {
					type: 'number',
					isArray: false,
					validate: yup.number().min(1).required(),
				},
				'target-type': {
					type: 'ref',
					isArray: true,
					reference: 'target-type',
					validate: yup.array().required(),
				},
				'acceptance-criteria': {
					type: 'text',
					isArray: false,
					validate: yup.string().required(),
				},
				lesson: {
					type: 'ref',
					isArray: true,
					reference: 'lesson',
					validate: yup.array().required(),
				},
			},
			list: ['lesson', 'target-type'],
		},

		phase: {
			fields: {
				title: {
					type: 'text',
					required: true,
					isArray: false,
					validate: yup.string().required(),
				},
				description: {
					type: 'text',
					isArray: false,
					validate: yup.string().required(),
				},
				target: {
					type: 'ref',
					isArray: true,
					reference: 'target',
					validate: yup.array().required(),
				},
			},

			list: ['target'],
		},

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
					validate: yup.array(),
				},
				member: {
					type: 'ref',
					reference: 'member',
					isArray: true,
					validate: yup.array(),
				},
			},

			list: ['roadmap', 'member'],
		},

		member: {
			fields: {
				'first-name': {
					type: 'text',
					isArray: false,
					validate: yup.string().required(),
				},
				'last-name': {
					type: 'text',
					isArray: false,
					validate: yup.string().required(),
				},
				email: {
					type: 'email',
					isArray: false,
					validate: yup.string().email().required(),
				},
				group: {
					type: 'ref',
					reference: 'group',
					isArray: true,
					validate: yup.array(),
				},
				role: {
					type: 'select',
					isArray: false,
					value: ['owner', 'admin', 'user'],
					validate: yup.string().required(),
				},
			},
			list: ['group'],
		},
	},
};
