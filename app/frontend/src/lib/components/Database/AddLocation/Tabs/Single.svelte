<script lang="ts">
  import { Button, Checkbox, Form, FormGroup, TextArea, TextInput } from 'carbon-components-svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function handleSubmit(event: Event) {
		if (!(event.target instanceof HTMLFormElement)) return;
		event.preventDefault();
		const data = new FormData(event.target);
		dispatch('submit', { event, data, action: event.target.action });
	}
</script>

<Form action="?/addLocation" method="POST" on:submit={handleSubmit}>
	<FormGroup>
		<TextInput
			labelText="Location Name"
			name="name"
			helperText="Full proper name of the location"
		/>
		<TextInput
			labelText="Location Short Name"
			name="short_name"
			helperText="Name abbreviation 3-4 characters"
		/>
  </FormGroup>
	<FormGroup>
		<Checkbox name="active" labelText="Active" checked />
  </FormGroup>
	<FormGroup>
		<Button type="submit">Add Vendor</Button>
  </FormGroup>
</Form>
