/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#ff3d00',
				secondary: '#ff6433',
				base: {
					50: '#41433A',
					100: '#41433A',
					200: '#343530',
					300: '#343530',
					400: '#272823',
					500: '#272823',
					600: '#272823',
					700: '#272823',
					800: '#1c1917',
					900: '#1c1917'
				}
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
