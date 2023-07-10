<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Button, TextArea } from 'carbon-components-svelte';

	export let loading = false;

	const submitForm: SubmitFunction = (input) => {
		loading = true;

		return async ({ update }) => {
			loading = false;
		};
	};
</script>

<form action="?/addVendor" method="POST" use:enhance={submitForm}>
	<input type="hidden" name="table" value="vendor" />
	<div class="form-group">
		<TextArea labelText="Name" name="name" />
	</div>
	<div class="form-group">
		<Button type="submit">Add Vendor</Button>
	</div>
</form>
