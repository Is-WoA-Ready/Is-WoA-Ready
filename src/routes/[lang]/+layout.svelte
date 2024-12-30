<script lang="ts">
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';

	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col items-center gap-2 px-2 py-4 md:px-8">
	<Header />

	<main>
		{@render children()}
	</main>

	<div class="grow"></div>

	<Footer />
</div>
