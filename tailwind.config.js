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
		backgroundColor: theme => ({
			'gray': '#565c5e',
			'myBlue': '#d1e4e3',
			'orang': '#e3342f',
			'white': '#FFF',
			'yellow': '#FFD218',
			'lightblue': '#18B9FF',
			'chineseSilver': '#D7C1C7',
			'pastelGray': '#C7D7C1',
			'jetStream': '#C1D7C6',
			



		}),
		variants: {
			extend: {
				backgroundColor: ['active'],
			}
		},
		plugins: []
	}

}