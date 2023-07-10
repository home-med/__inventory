<script lang="ts">
	import { Checkbox, FormGroup } from 'carbon-components-svelte';
	import { siteStore } from '$lib/stores/site';
	import type { LocationResponse } from '$lib/pocketbase-types';

	const locations: LocationResponse[] = $siteStore.locations;
	let group: string[] = [];
	let all = false;

	$: group = group.includes("all") ? [] : group;
 	</script>

All {all}<br >
{JSON.stringify(group)}
<input type="hidden" name="locations" bind:value={group} />
<FormGroup legendText="Visibility">
	<Checkbox
		labelText="Set visibility to all sites?"
		value="all"
		bind:group
		disabled={locations.length < 2}
	/>
	{#each locations as location (location.id)}
		<Checkbox
			labelText={location.name}
			value={location.id}
			bind:group
			disabled={all}
		/>
	{:else}
		No locations available.
	{/each}
</FormGroup>

<style>
</style>
