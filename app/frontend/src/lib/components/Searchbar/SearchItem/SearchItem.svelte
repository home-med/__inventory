<script lang="ts">
	import { Button } from 'carbon-components-svelte';
	import { createEventDispatcher } from 'svelte';

	export let item: Record<string, unknown> = {};
	export let data: Record<string, string>[] = [];

	const dispatch = createEventDispatcher();

  const handlePick = () => {
    dispatch("pick", {id: item.id});
  }
</script>

<li>
	{#each data as datum}
		<span><strong>{datum.display}:</strong><br />{item[datum.index] || "No Data"}<br /></span>
	{/each}
	<Button on:click={handlePick}>Choose</Button>
</li>

<style>
  li {
    position: relative;
    flex: 50%;
		word-wrap: break-word;
  }
</style>
