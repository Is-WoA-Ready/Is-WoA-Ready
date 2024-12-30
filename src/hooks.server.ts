import { defaultLocale, locales, setLocale, setRoute } from '$lib/translations';
import { type Handle, type HandleServerError } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { url } = event;
	const { pathname } = url;

	// Get defined locales
	const supportedLocales = locales.get().map((l) => l.toLowerCase());

	// Try to get locale from `pathname`.
	let locale = supportedLocales.find(
		(l) => l === `${pathname.match(/[^/]+?(?=\/|$)/)}`.toLowerCase()
	);

	// If route locale is not supported
	if (!locale) {
		// // Get user preferred locale
		// locale =
		// 	`${`${request.headers.get('accept-language')}`.match(/[a-zA-Z]+?(?=-|_|,|;)/)}`.toLowerCase();
		// // Set default locale if user preferred locale does not match
		// if (!supportedLocales.includes(locale)) locale = defaultLocale;
		// // 301 redirect
		// return new Response(undefined, { headers: { location: `/${locale}${pathname}` }, status: 301 });
		// 404 redirect
		// throw error(404, 'Page not found');
		locale = defaultLocale;
	}

	// Add html `lang` attribute
	return resolve(
		{ ...event, locals: { lang: locale } },
		{
			transformPageChunk: ({ html }) => html.replace(/<html.*>/, `<html lang="${locale}">`)
		}
	);
};

export const handleError: HandleServerError = async ({ event }) => {
	const { locals } = event;
	const { lang } = locals;

	await setLocale(lang);
	await setRoute('error');
};
