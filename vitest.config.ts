import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom', // ✓ You have this
		globals: true,
		setupFiles: ['./vitest-setup.ts']
	},
	resolve: {
		conditions: ['browser'] // ← ADD THIS - forces browser versions of packages
	}
});