<script lang="ts">
	import { setContext } from 'svelte';
	setContext("Accordion", {
		currentOpen: null,
	});
</script>

<ul on:click on:focus on:keypress on:mouseover on:mouseenter on:mouseleave>
	<slot />
</ul>

<style>
	
</style>
