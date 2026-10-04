import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter({ fallback: '404.html' }), // static hosts serve this for unknown paths
			prerender: {
				// Tools are separate projects deployed under /tools/<slug>/, so this build can't see them.
				// Ignore 404s there only; every other broken link still fails the build.
				handleHttpError: ({ path, message }) => {
					if (path.startsWith('/tools/') && path !== '/tools/') return;
					throw new Error(message);
				}
			}
		})
	]
});
