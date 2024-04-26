/** @type {import('tailwindcss').Config} */
const config = {
	content: ['./src/**/*.{html,js,ts,svelte}'],
	theme: {
		extend: {
			screens: {
				// The 'antialiased' class should only be use in devices with a high enough pixel density. This query allows to target those devices.
				'high-dpi': {
					raw: 'screen and (-webkit-min-device-pixel-ratio: 2), screen and (min-resolution: 2dppx)'
				}
			}
		}
	},
	plugins: []
};

export default config;
