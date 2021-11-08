module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: ['plugin:react/recommended', 'plugin:prettier/recommended', 'prettier'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 12,
		sourceType: 'module'
	},
	plugins: ['react', 'prettier'],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'react/prop-types': ['off'],
		'prettier/prettier': ['off']
	}
};
