import path from 'path';
import fs from 'fs';
import type { EntryGenerator } from './$types';
import lang from '$lib/translations/lang';

const pwd = process.cwd();

export const entries: EntryGenerator = () => {
	const supportedLanguages = Object.keys(lang);

	const vendors = fs
		.readdirSync(path.join(pwd, 'static/apps'), { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);

	const pages = supportedLanguages.flatMap((lang) =>
		vendors.flatMap((vendor) => ({
			lang,
			vendor
		}))
	);

	return pages;
};
