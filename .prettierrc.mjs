import sapphirePrettierConfig from '@sapphire/prettier-config';

/** @type {import('prettier').Config} */
export default {
	...sapphirePrettierConfig,
	plugins: ['prettier-plugin-astro'],
	overrides: [
		...sapphirePrettierConfig.overrides,
		{
			files: '*.astro',
			options: {
				parser: 'astro'
			}
		}
	]
};
