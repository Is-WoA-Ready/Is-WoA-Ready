<script lang="ts">
	import { page } from '$app/state';
	import { appState } from '$lib/store.svelte';
	import { t } from '$lib/translations';
	import type { PageData } from './$types';
	import * as Table from '$lib/components/ui/table';
	import { Badge } from '$lib/components/ui/badge';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Earth } from 'lucide-svelte';

	const { vendor: shortVendor, app: shortApp } = page.params;

	export let data: PageData;
	const { manifest, compatibility, logoPath: appLogoPath } = data;

	// @ts-ignore  - this is an issue with i18n library, https://github.com/sveltekit-i18n/lib/issues/60
	appState.title = $t('app.does-app-woa-ready', { app: manifest.name });

	// Find the latest version of the app
	let latestVersion = compatibility.find((c) => c.latest === true);
	if (!latestVersion) {
		latestVersion = compatibility[0];
	}

	function getCompatibilityColor(compatibility: string) {
		if (compatibility === 'incompatible') {
			return 'text-red-500';
		} else if (compatibility === 'emulation') {
			return 'text-yellow-500';
		} else if (compatibility === 'native') {
			return 'text-green-500';
		}
		return 'text-gray-400';
	}

	// Set the color of the compatibility text
	const compatibilityColor = getCompatibilityColor(latestVersion.compatibility);
</script>

<svelte:head>
	{/* @ts-ignore */ null}
	<title>{$t('app.does-app-woa-ready', { app: manifest.name })}</title>
</svelte:head>

<div class="flex flex-col items-center gap-1 lg:mt-2 lg:gap-4">
	<div class="text-center">
		<h2 class="scroll-m-20 text-xl font-semibold tracking-tight lg:text-3xl {compatibilityColor}">
			{#if latestVersion?.compatibility === 'incompatible'}
				{/* @ts-ignore */ null}
				{$t('app.incompatible', { version: latestVersion.version })}
			{:else if latestVersion?.compatibility === 'emulation'}
				{/* @ts-ignore */ null}
				{$t('app.compatible-emulation', { version: latestVersion.version })}
			{:else if latestVersion?.compatibility === 'native'}
				{/* @ts-ignore */ null}
				{$t('app.compatible-native', { version: latestVersion.version })}
			{:else}
				{/* @ts-ignore */ null}
				{$t('app.compatible-unknown', { version: latestVersion.version })}
			{/if}
		</h2>
	</div>

	<section class="mt-4 flex flex-col gap-8 lg:w-7/12">
		<section class="flex flex-col gap-4">
			<section class="flex flex-row items-center gap-3">
				{#if appLogoPath}
					<img src={appLogoPath} alt="App Logo" class="h-10" />
				{:else}
					<div class="h-10 w-10 rounded-full bg-gray-200"></div>
				{/if}
				<section class="flex flex-col">
					<h3 class="text-xl font-semibold">{manifest.name}</h3>
					<p class="text-gray-500">{manifest.vendor}</p>
				</section>
			</section>
			<article>
				<p>{manifest.description}</p>
			</article>
			<section class="flex flex-col gap-2">
				<p>
					{$t('app.category')}:
					{#each manifest.categories as category}
						<Badge class="ml-1" variant="secondary">{category}</Badge>
					{/each}
				</p>
				{#if manifest.tags}
					<p>
						{$t('app.tags')}:
						{#each manifest.tags as tag}
							<Badge class="ml-1" variant="secondary">{tag}</Badge>
						{/each}
					</p>
				{/if}
			</section>
			{#if manifest.homepage}
				<section>
					<Button size="sm" href={manifest.homepage} target="_blank">
						<Earth />
						{$t('app.visit-website')}
					</Button>
				</section>
			{/if}
		</section>
		<section>
			<h2
				class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
			>
				{$t('app.tested-versions')}
			</h2>
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>{$t('app.version')}</Table.Head>
						<Table.Head>{$t('app.contributor')}</Table.Head>
						<Table.Head>{$t('app.date')}</Table.Head>
						<Table.Head class="text-right">{$t('app.compatibility')}</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each compatibility as version}
						<Table.Row>
							<Table.Cell>
								{version.version}
								{#if version.latest}
									<Badge class="ml-1">{$t('app.latest')}</Badge>
								{/if}
								{#if version.beta}
									<Badge class="ml-1" variant="secondary">{$t('app.beta')}</Badge>
								{/if}
							</Table.Cell>
							<Table.Cell>{version.contributor}</Table.Cell>
							<Table.Cell>{new Date(version.date).toLocaleDateString()}</Table.Cell>
							<Table.Cell class="text-right">
								<span class={getCompatibilityColor(version.compatibility)}>
									{#if version.compatibility === 'incompatible'}
										{$t('app.compatibility-incompatible')}
									{:else if version.compatibility === 'emulation'}
										{$t('app.compatibility-emulation')}
									{:else if version.compatibility === 'native'}
										{$t('app.compatibility-native')}
									{:else}
										{$t('app.compatibility-unknown')}
									{/if}
								</span></Table.Cell
							>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</section>
		<section>
			<h2
				class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
			>
				{$t('app.discussions')}
			</h2>
		</section>
	</section>
</div>
