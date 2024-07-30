import { defineConfig } from 'astro/config';
import bun from '@nurodev/astro-bun';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://cdn.wolfstar.rocks',
	adapter: bun(),
	output: 'hybrid',
	integrations: [sitemap()]
});
