import { defaultLocale, setLocale, setRoute } from '$lib/translations';
import { type Load } from '@sveltejs/kit';
import langs from '$lib/translations/lang';

export const prerender = true;

export const load: Load = async ({ url }) => {
	const { pathname } = url;

	const supportedLocales = Object.keys(langs);

	const lang = `${pathname.match(/[a-z]{2}(?:-[A-Z]{2})?(?=\/|$)/) || ''}`;
	if (supportedLocales.includes(lang)) {
		const route = pathname.replace(new RegExp(`^/${lang}`), '');
		await setLocale(lang);
		await setRoute(route);
		return { route, lang };
	}

	await setLocale(defaultLocale);
	await setRoute(pathname);

	// If lang not set and pathname is not empty redirect to 404
	// if (lang !== '') {
	// 	error(404, 'Page not found');
	// }
};
