<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Form, FormGroup, Select, SelectItem } from 'carbon-components-svelte';
	import FileDrop from '$lib/components/FileDrop/FileDrop.svelte';
	import { SetVisibility } from '$lib/components/Database/SetVisibility';
	import type { LocationResponse } from '$lib/pocketbase-types';
	import Button from '$lib/components/Elements/Button/Button.svelte';

	export let locations: LocationResponse[] = [];

	const dispatch = createEventDispatcher();
	let files: File[];
	let setLocations: string;
	let systemIDLocation: string;

	const onFileAdd = (e: CustomEvent) => {
		files = e.detail.files;
	}

	function handleSubmit(event: Event) {
		if (!(event.target instanceof HTMLFormElement)) return;
		event.preventDefault();
		const data = {"files": files, setLocations, systemIDLocation };
		dispatch('submit', { event, data });
	}
</script>

<Form action="?/addProductFile" method="POST" enctype="multipart/form" on:submit={handleSubmit}>
	<FileDrop on:FileAdd={onFileAdd} />
	<SetVisibility {locations} />
	<FormGroup legendText="System ID">
		<Select labelText="Location" name="system_id_location" required bind:value={systemIDLocation}>
			{#each locations as location}
				<SelectItem value={location.id} text={location.name} />
			{/each}
		</Select>
	</FormGroup>
	<FormGroup>
		<Button type="submit" class="p-4">Add Product</Button>
	</FormGroup>
</Form>
