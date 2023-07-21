<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { Button, Checkbox, FileUploader, Form, FormGroup, TextInput  } from "carbon-components-svelte";

	import SetVisibility from "$lib/components/Database/SetVisibility/SetVisibility.svelte";

	const dispatch = createEventDispatcher();
	let isFirstRowHeaders: boolean = true;

	function handleSubmit(event: Event) {
		if (!(event.target instanceof HTMLFormElement)) return;
		event.preventDefault();
		const data = new FormData(event.target);
		dispatch('submit', { event, data });
	}
</script>

  <Form action="?/addProductFile" method="POST" enctype="multipart/Form" on:submit={handleSubmit}>
    <FormGroup legendText="Files">
      <FileUploader name="files" multiple accept={[".csv"]} labelTitle="Upload Files" buttonLabel="Add Files" status="edit" />
			</FormGroup>
			<FormGroup legendText="Options">
			<Checkbox labelText="First row has headers" name="isFirstRowHeaders" value="yes" bind:checked={isFirstRowHeaders} />
			{#if !isFirstRowHeaders}
				<TextInput labelText="Headers" name="headers" helperText='All items should be in the form of "header","header","header" with quotes.' />
			{/if}
			<SetVisibility />
    </FormGroup>
    <FormGroup>
      <Button type="submit">Add Products</Button>
    </FormGroup>
  </Form>
