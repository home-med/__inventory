<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { Form, FormGroup  } from "carbon-components-svelte";
	import FileDrop from "$lib/components/FileDrop/FileDrop.svelte";
	import Button from "$lib/components/Elements/Button.svelte";

	const dispatch = createEventDispatcher();

	const onFileUPload = (e: CustomEvent) => {};

	function handleSubmit(event: Event) {
		if (!(event.target instanceof HTMLFormElement)) return;
		event.preventDefault();
		const data = new FormData(event.target);
		console.log(data);
		dispatch('submit', { event, data, action: event.target.action });
	}
</script>

  <Form action="?/addVendorFile" method="POST" enctype="multipart/Form" on:submit={handleSubmit}>
		<FileDrop on:fileUpload={onFileUPload} />
    <FormGroup>
      <Button type="submit" kind="primary">Add Product</Button>
    </FormGroup>
  </Form>
