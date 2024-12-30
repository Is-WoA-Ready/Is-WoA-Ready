import path from 'path';
import fs from 'fs';
import type { EntryGenerator, PageServerLoad } from './$types';
import lang from '$lib/translations/lang';
import * as toml from 'js-toml';
import type { AppCompatibility, AppManifest } from '$lib/apps/type';
import { sortByVersion } from '$lib/apps/utils';

const pwd = process.cwd();

export const entries: EntryGenerator = () => {
	const supportedLanguages = Object.keys(lang);

	const vendors = fs
		.readdirSync(path.join(pwd, 'static/apps'), { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);

	const apps = vendors.flatMap((vendor) =>
		fs
			.readdirSync(path.join(pwd, 'static/apps', vendor), { withFileTypes: true })
			.filter((dirent) => dirent.isDirectory())
			.map((dirent) => dirent.name)
	);

	const pages = supportedLanguages.flatMap((lang) =>
		vendors.flatMap((vendor) =>
			apps.flatMap((app) => ({
				lang,
				vendor,
				app
			}))
		)
	);

	return pages;
};

export const load: PageServerLoad = ({ params }) => {
	const { vendor: shortVendor, app: shortApp } = params;

	try {
		// Read app manifest
		const manifestContent = fs.readFileSync(
			path.join(pwd, 'static/apps', shortVendor, shortApp, 'manifest.toml'),
			{ encoding: 'utf8' }
		);

		// Parse app manifest
		const manifest = toml.load(manifestContent) as AppManifest;

		// Read app compatibility
		const compatibilityContent = fs.readFileSync(
			path.join(pwd, 'static/apps', shortVendor, shortApp, 'compatibility.toml'),
			{ encoding: 'utf8' }
		);

		// Parse app compatibility
		const compatibility = toml.load(compatibilityContent) as AppCompatibility;

		const sortedVersions = sortByVersion(compatibility.versions);

		// Find logo
		let logoPath = null;
		const imageExtensions = ['svg', 'png', 'jpg', 'jpeg', 'webp'];
		for (const ext of imageExtensions) {
			const filePath = path.join(
				pwd,
				'static/apps',
				shortVendor,
				shortApp,
				'assets',
				`logo.${ext}`
			);
			if (fs.existsSync(filePath)) {
				logoPath = `/apps/${shortVendor}/${shortApp}/assets/logo.${ext}`;
				break;
			}
		}

		return { manifest, compatibility: sortedVersions, logoPath };
	} catch (error) {
		throw new Error(`Failed to load app information: ${error}`);
	}
};
