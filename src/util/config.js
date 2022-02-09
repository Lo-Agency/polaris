import * as yup from 'yup';

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
			isProtected: true
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
					validate: {
						title: yup.string().required()
					}
				},
				phase: {
					type: "ref",
					reference: "phase",
					isArray: true,
					validate: {
						phase:  yup.array().required()
					}
				},
				startingDate: {
					type: "date",
					isArray: false,
					validate: {
						startingDate: yup.date().required()
					}
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
					validate: {
						title: yup.string().required()
					}
				},

				learning: {
					type: "ref",
					isArray: true,
					reference: "learning",
					validate: {
						learning: yup.array().required()
					}
				},
				project: {
					type: "ref",
					isArray: true,
					reference: "project",
					validate: {
						project: yup.array().required()
					}
				}
			},

			list: ["learning", "project"]
		},

		learning: {
			fields: {
				title: {
					type: "text",
					isArray: false,
					validate: {
						title: yup.string().required()
					}
				},
				category: {
					type: "select",
					isArray: false,
					value: ["Frontend", "Backend", "General", "Soft Skills"],
					validate: {
						category: yup.string().required()
					}
				},
				resources: {
					type: "text",
					isArray: false,
					validate: {
						resources:  yup.string().required()
					}
				},
				priority: {
					type: "select",
					isArray: false,
					value: ["Low", "Medium", "High"],
					validate: {
						priority: yup.string().required()
					}
				}
			},

		},

		project: {
			fields: {
				title: {
					type: "text",
					isArray: false,
					validate: {
						title: yup.string().required()
					}
				},
				days: {
					type: "number",
					isArray: false,
					validate: {
						days: yup.number().required()
					}
				},
				projectType: {
					type: "select",
					isArray: false,
					value: ["Real", "Team", "Personal", "Optional"],
					validate: {
						projectType: yup.string().required()
					}
				},
				learningDay: {
					type: "number",
					isArray: false,
					validate: {
						learningDay: yup.number().required()
					}

				}
			},
		},
		group: {
			fields: {
				title: {
					type: "text",
					isArray: false,
					validate: {
						title: yup.string().required()
					}
				},
				description: {
					type: "text",
					isArray: false,
					validate: {
						description: yup.string().required()
					}
				},
				slug: {
					type: "text",
					isArray: false,
					validate: {
						slug: yup.string().required()
					}
				},
				roadmap: {
					type: "ref",
					reference: "roadmap",
					isArray: true,
					validate: {
						roadmap: yup.array().required()
					}
				}
			},

			list: ["roadmap"]

		},
		user: {
			fields: {
				email: {
					type: "text",
					isArray: false,
					validate: {
						email: yup.string().email().required()
					},
				},
				group: {
					type: "ref",
					reference: "group",
					isArray: true,
					validate: {
						group: yup.array()
					},
				},
				type: {
					type: "select",
					isArray: false,
					value: ["admin", "user"],
					validate: {
						type: yup.string().required()
					},
				},
				isApproved: {
					type: "boolean",
					isArray: false,
					validate: {
						isApproved: yup.boolean()
					},
				},
			},
			list: ["group"]
		},

	}
};