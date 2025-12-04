<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.png';
	import { Toaster } from '$lib/components/ui/sonner';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>TwoDo</title>
</svelte:head>
<Toaster richColors />
{@render children()}
