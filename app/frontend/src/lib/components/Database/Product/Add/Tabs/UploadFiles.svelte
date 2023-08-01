<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Button, Form, FormGroup, Select, SelectItem } from 'carbon-components-svelte';
	import FileDrop from '$lib/components/FileDrop/FileDrop.svelte';
	import { SetVisibility } from '$lib/components/Database/SetVisibility';
	import type { LocationResponse } from '$lib/pocketbase-types';

	export let locations: LocationResponse[] = [];

	const dispatch = createEventDispatcher();

	function handleSubmit(event: Event) {
		if (!(event.target instanceof HTMLFormElement)) return;
		event.preventDefault();
		const data = new FormData(event.target);
		dispatch('submit', { event, data });
	}
</script>

<Form action="?/addProductFile" method="POST" enctype="multipart/Form" on:submit={handleSubmit}>
	<FileDrop />
	<SetVisibility {locations} />
	<FormGroup legendText="System ID">
		<Select labelText="Location" name="system_id_location" required>
			{#each locations as location}
				<SelectItem value={location.id} text={location.name} />
			{/each}
		</Select>
	</FormGroup>
	<FormGroup>
		<Button type="submit">Add Products</Button>
	</FormGroup>
</Form>
