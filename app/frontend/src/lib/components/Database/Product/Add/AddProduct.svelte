<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { BrandResponse, LocationResponse, VendorResponse } from '$lib/pocketbase-types';
	import { Toasts, addToast } from '$lib/stores/toast';
	import { SingleItem, UploadFiles } from './Tabs';
	import { Tabs, Tab, TabContent } from 'carbon-components-svelte';

	export let brands: BrandResponse[] = [];
	export let vendors: VendorResponse[] = [];
	export let locations: LocationResponse[] = [];

	const handleSubmit = async (event: CustomEvent) => {
		const form = event.detail.event.target;
		const data = event.detail.data;

		addToast({
			"type": Toasts.INFO,
			"message": "Spinning up",
			"timeout": 3000
		})

		const response = await fetch(form.action, {
			method: "POST",
			body: data,
		});

		const result = deserialize(await response.text());
		console.log(result);

		if (result.type === "success") {
			addToast({
				"type": Toasts.INFO,
				"message": "Success",
			});
			await invalidateAll();
		} else {
			addToast({
				"type": Toasts.ERROR,
				"message": "We borked!"
			})
		}

		applyAction(result);
	}
</script>

<Tabs>
	<Tab label="File Upload" />
	<Tab label="Single Item" />
	<svelte:fragment slot="content">
		<TabContent><UploadFiles {locations} on:submit={handleSubmit} /></TabContent>
		<TabContent><SingleItem {vendors} {brands} {locations} on:submit={handleSubmit} /></TabContent>
	</svelte:fragment>
</Tabs>
