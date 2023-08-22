<script lang="ts">
	import { Checkbox, FormGroup } from 'carbon-components-svelte';
	import type { LocationResponse } from '$lib/pocketbase-types';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let selected: string[] = [];
	export let locations: LocationResponse[] = [];
	const toggleAll = (e: Event) => {
		if (e.target instanceof HTMLInputElement) {
			selected = e.target.checked ? [...locations.map(item => item.id)] : [];
		}
		dispatch("VisibilityUpdated", {selected})
	};
 	</script>

<input type="hidden" name="locations" bind:value={selected} />
<FormGroup legendText="Visibility">
	<Checkbox
		labelText="Set eCom visibility to all sites?"
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
			on:check={() => {dispatch("VisibilityUpdated", {selected})}}
		/>
	{:else}
		No locations available.
	{/each}
</FormGroup>

<style>
</style>
