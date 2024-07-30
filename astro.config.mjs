import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
	site: 'https://cdn.wolfstar.rocks',
	adapter: node({
		mode: 'standalone',
		host: import.meta.env.HOST,
		port: import.meta.env.PORT
	}),
	output: 'server',
	integrations: [sitemap()]
});
