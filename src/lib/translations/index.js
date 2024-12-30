import lang from './lang';
import i18n from 'sveltekit-i18n';

/** @type {import('sveltekit-i18n').Config} */
export const config = {
	translations: {
		en: { lang },
		'zh-TW': { lang }
	},
	loaders: [
		{
			locale: 'en',
			key: 'home',
			loader: async () => (await import('./en/home.json')).default
		},
		{
			locale: 'en',
			key: 'error',
			loader: async () => (await import('./en/error.json')).default
		},
		{
			locale: 'en',
			key: 'app',
			loader: async () => (await import('./en/app.json')).default
		},
		{
			locale: 'zh-TW',
			key: 'home',
			loader: async () => (await import('./zh-TW/home.json')).default
		},
		{
			locale: 'zh-TW',
			key: 'error',
			loader: async () => (await import('./zh-TW/error.json')).default
		},
		{
			locale: 'zh-TW',
			key: 'app',
			loader: async () => (await import('./zh-TW/app.json')).default
		}
	]
};

export const defaultLocale = 'en';

export const { t, locale, locales, loading, setLocale, setRoute, translations } = new i18n(config);
