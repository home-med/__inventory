<script lang="ts">
	import { Button, Checkbox, Form, FormGroup, TextArea, TextInput } from 'carbon-components-svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function handleSubmit(event: Event) {
		if (!(event.target instanceof HTMLFormElement)) return;
		event.preventDefault();
		const action = event.target.action;
		const data = new FormData(event.target);
		dispatch('submit', { event, data, action });
	}

	let value ="";

	$: value = [...new Set(value.split(/\r?\n/))].sort().filter(item => item && item.toLowerCase() !== "brand").join("\n");
</script>

<Form action="?/addBrand" method="POST" on:submit={handleSubmit}>
	<FormGroup>
		<TextInput labelText="Name" name="name" />
		<Checkbox labelText="Is Archived (invisible)" value={false} name="archived" />
	</FormGroup>
	<FormGroup>
		<Button type="submit">Add Brand</Button>
	</FormGroup>
</Form>
