import { defineConfig } from 'vitest/config';

import { sveltekit } from '@sveltejs/kit/vite';
import tailwindNesting from 'tailwindcss/nesting';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		postcss: {
			plugins: [tailwindNesting(), tailwindcss(), autoprefixer()]
		}
	},

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
