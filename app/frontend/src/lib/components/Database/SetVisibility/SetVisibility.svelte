<script lang="ts">
	import { Checkbox, FormGroup } from 'carbon-components-svelte';
	import { siteStore } from '$lib/stores/site';
	import type { LocationResponse } from '$lib/pocketbase-types';

	export let selected: string[] = [];
	const locations: LocationResponse[] = $siteStore.locations;
	const toggleAll = (e: Event) => {
		if (e.target instanceof HTMLInputElement) {
			selected = e.target.checked ? [...locations.map(item => item.id)] : [];
		}
	};
 	</script>

<input type="hidden" name="locations" bind:value={selected} />
<FormGroup legendText="Visibility">
	<Checkbox
		labelText="Set visibility to all sites?"
		value="all"
		disabled={locations.length < 2}
		on:change={toggleAll}
		checked={selected.length === locations.length}
	/>
	{#each locations as location (location.id)}
		<Checkbox
			labelText={location.name}
			value={location.id}
			bind:group={selected}
		/>
	{:else}
		No locations available.
	{/each}
</FormGroup>

<style>
</style>
