<script lang="ts">
	import logo from '$lib/assets/IsWoAReadyLogo.png';
	import { appState } from '$lib/store.svelte';
</script>

<header class="flex flex-col items-center text-center">
	<img src={logo} alt="Logo" class="h-32" />
	<h1 class="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
		{appState.title}
	</h1>
</header>
