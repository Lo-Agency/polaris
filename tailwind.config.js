module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		screens: {
			'xsm': { 'min': '320px', 'max': '639px' },
			'sm': { 'min': '640px', 'max': '767px' },
			'md': { 'min': '768px', 'max': '1023px' },
			'lg': { 'min': '1024px', 'max': '1279px' },
			'xl': { 'min': '1280px', 'max': '1535px' },
			'2xl': { 'min': '1536px' },
		},
		// backgroundColor: theme => ({
		// 	'gray': '#565c5e',
		// 	'green': '#a8c83c',
		// 	'cyan': '#24a6a7',
		// 	'grass-green': '#88c67e',
		// 	'yellow': '#FFD218',
		// 	'lightblue': '#b0e3e7',
		// 	'lightGray': '#f0f2f1',
		// 	'blue': '#90d7dc',
		// 	'grainsboro': '#d4cbd4',
		// 	'lemon': '#fff88a',
		// 	'greenLemon': '#f8ffd8',
		// }),
		variants: {
			extend: {
				backgroundColor: ['active'],
			}
		},
		plugins: []
	}

}