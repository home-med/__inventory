<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { Form, FormGroup, Select, SelectItem } from 'carbon-components-svelte';
	import FileDrop from '$lib/components/FileDrop/FileDrop.svelte';
	import { SetVisibility } from '$lib/components/Database/SetVisibility';
	import type { LocationResponse } from '$lib/pocketbase-types';
	import Button from '$lib/components/Elements/Button.svelte';
	import PocketBase from 'pocketbase';
	import { env } from '$env/dynamic/public';

	const PB = new PocketBase(env.PUBLIC_POCKETBASE_URL);
	export let uploadCount = 0;
	export let processState = "Idle"


	onMount(async () => {
		PB.collection('status').subscribe('*', async function (e) {
			processState = e.record.currentState;
		});
		PB.collection('product').subscribe('*', async function (e) {
			if (uploadCount === 0) return;
			uploadCount -= 1;
		});
		PB.collection('product_system_id').subscribe("*", async function (e) {
			if (uploadCount === 0) return;
			uploadCount -= 1;
		});
		PB.collection('product_visibility').subscribe("*", async function (e) {
			if (uploadCount === 0) return;
			uploadCount -= 1;
		})
	});

	onDestroy(() => {
		PB.collection('status').unsubscribe();
		PB.collection('product').unsubscribe();
		PB.collection('product_system_id').unsubscribe();
		PB.collection('product_visibility').unsubscribe();
	});

	export let locations: LocationResponse[] = [];


	const dispatch = createEventDispatcher();
	let files: File[];
	let setLocations: string;
	let systemIDLocation: string;

	function handleSubmit(event: Event) {
		if (!(event.target instanceof HTMLFormElement)) return;
		event.preventDefault();
		const data = { files, setLocations, systemIDLocation };
		dispatch('submit', { event, data });
	}
</script>

<Form action="?/addProductFile" method="POST" enctype="multipart/form" on:submit={handleSubmit}>
	Records left to create: {uploadCount}<br />
	Status: {processState}
	<FileDrop on:filesUpdated />
	<SetVisibility on:VisibilityUpdated {locations} />
	<FormGroup legendText="System ID">
		<Select labelText="Location" name="system_id_location" required bind:value={systemIDLocation}>
			{#each locations as location}
				<SelectItem value={location.id} text={location.name} />
			{/each}
		</Select>
	</FormGroup>
	<FormGroup>
		<Button type="submit" kind="primary">Add Product</Button>
	</FormGroup>
</Form>
