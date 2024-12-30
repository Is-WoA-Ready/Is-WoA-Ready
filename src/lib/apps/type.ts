export interface AppManifest {
	name: string;
	vendor: string;
	description?: string;
	homepage?: string;
	categories: string[];
	tags?: string[];
}

export interface AppCompatibilityVersion {
	version: string;
	contributor: string;
	date: string;
	compatibility: 'incompatible' | 'emulation' | 'native' | 'unknown';
	beta?: boolean;
	latest?: boolean;
}

export interface AppCompatibility {
	versions: AppCompatibilityVersion[];
}
