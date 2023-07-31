<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { Button, Form, FormGroup } from "carbon-components-svelte";
	import FileDrop from "$lib/components/FileDrop/FileDrop.svelte";
	import { SetVisibility } from "$lib/components/Database/SetVisibility";
	import type { LocationResponse } from "$lib/pocketbase-types";

	export let locations: LocationResponse[] = [];

	const dispatch = createEventDispatcher();

	const onFileUPload = (e: CustomEvent) => {};

	function handleSubmit(event: Event) {
		if (!(event.target instanceof HTMLFormElement)) return;
		event.preventDefault();
		const data = new FormData(event.target);
		console.log(data);
		dispatch('submit', { event, data });
	}
</script>

  <Form action="?/addProductFile" method="POST" enctype="multipart/Form" on:submit={handleSubmit}>
		<FileDrop on:fileUpload={onFileUPload}/>
		<SetVisibility {locations} />
    <FormGroup>
      <Button type="submit">Add Products</Button>
    </FormGroup>
  </Form>
