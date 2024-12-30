<script lang="ts">
	import { appState } from '$lib/store.svelte';
	import { t } from '$lib/translations';

	appState.title = $t('home.is-woa-ready');
</script>

<svelte:head>
	<title>{$t('home.is-woa-ready')}</title>
</svelte:head>
