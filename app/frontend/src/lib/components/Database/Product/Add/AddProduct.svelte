<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { TToasts, addToast } from '$lib/stores/toast';
	import { MultipleItems, SingleItem, UploadFiles } from './Tabs';
	import { Tabs, Tab, TabContent } from 'carbon-components-svelte';


	const handleSubmit = async (event: CustomEvent) => {
		const form = event.detail.event.target;
		const data = event.detail.data;


		addToast({
			"type": TToasts.INFO,
			"message": "Spinning up",
			"timeout": 3000
		})

		const response = await fetch(form.action, {
			method: "POST",
			body: data,
		});

		const result = deserialize(await response.json());

		if (result.type === "success") {
			addToast({
				"type": TToasts.INFO,
				"message": "Success",
			})
			await invalidateAll();
		}

		applyAction(result);
	}
</script>

<Tabs>
	<Tab label="Single Item" />
	<Tab label="Mulitple Items" />
	<Tab label="File Upload" />
	<svelte:fragment slot="content">
		<TabContent><SingleItem on:submit={handleSubmit} /></TabContent>
		<TabContent><MultipleItems on:submit={handleSubmit} /></TabContent>
		<TabContent><UploadFiles on:submit={handleSubmit} /></TabContent>
	</svelte:fragment>
</Tabs>
