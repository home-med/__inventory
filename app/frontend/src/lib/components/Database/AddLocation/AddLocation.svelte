<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Button, Checkbox, TextInput } from 'carbon-components-svelte';

	export let loading = false;

	const submitForm: SubmitFunction = (input) => {
		loading = true;

		return async ({ update }) => {
			loading = false;
		};
	};
</script>

<form action="?/addLocation" method="POST" use:enhance={submitForm}>
	<input type="hidden" name="table" value="vendor" />
	<div class="form-group">
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
	</div>
	<div class="form-group">
		<Checkbox name="active" labelText="Active" />
	</div>
	<div class="form-group">
		<Button type="submit">Add Vendor</Button>
	</div>
</form>
