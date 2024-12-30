import type { AppCompatibilityVersion } from './type';

export function sortByVersion(versions: AppCompatibilityVersion[]) {
	return versions.sort((a, b) => {
		const aVersion = a.version.split('.').map(Number);
		const bVersion = b.version.split('.').map(Number);
		for (let i = 0; i < Math.max(aVersion.length, bVersion.length); i++) {
			if (aVersion[i] === undefined) return -1;
			if (bVersion[i] === undefined) return 1;
			if (aVersion[i] > bVersion[i]) return -1;
			if (aVersion[i] < bVersion[i]) return 1;
		}
		return 0;
	});
}
