<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { LocationResponse } from '$lib/pocketbase-types';
	import { Toasts, addToast } from '$lib/stores/toast';
	import SingleItem from './Tabs/SingleItem.svelte';
	import UploadFiles from './Tabs/UploadFiles.svelte';
	import { Tabs, Tab, TabContent } from 'carbon-components-svelte';
	export let locations: LocationResponse[] = [];

	let processState = "Idle"
	let locationCount = 0;
	let uploadCount = 0;
	let files: File[] = [];

	const checkNumberOfPotentialRecords = async () => {
		if (!files) {
			uploadCount = 0;
			return;
		}
		uploadCount = 0;
		for (const file of files) {
			const fileRead = await file.text();
			const amt = fileRead.match(/\r?\n/g)?.length ?? 0;
			uploadCount += amt * 2 + (locationCount*amt) - 2;
		}
	};

	const handleSubmit = async (event: CustomEvent) => {
		const form = event.detail.event.target;
		const formData = new FormData(form);

		addToast({
			type: Toasts.INFO,
			message: 'Spinning up',
			timeout: 3000
		});

		const response = await fetch(form.action, {
			method: 'POST',
			body: formData
		});

		const result = deserialize(await response.text());

		if (result.type === 'success') {
			addToast({
				type: Toasts.INFO,
				message: 'Success'
			});
			await invalidateAll();
		} else {
			addToast({
				type: Toasts.ERROR,
				message: 'We borked!'
			});
		}

		invalidateAll();

		applyAction(result);
	};
</script>

<Tabs>
	<Tab label="File Upload" />
	<Tab label="Single Item" />
	<svelte:fragment slot="content">
		<TabContent>
			<UploadFiles
				{locations}
				{processState}
				{uploadCount}
				on:submit={handleSubmit}
				on:filesUpdated={(e) => {files = e.detail.files; checkNumberOfPotentialRecords();}}
				on:VisibilityUpdated={(e) => {locationCount = e.detail.selected.length; checkNumberOfPotentialRecords();}}
			/>
			</TabContent>
		<TabContent><SingleItem on:submit={handleSubmit} /></TabContent>
	</svelte:fragment>
</Tabs>
