<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Button, TextArea } from 'carbon-components-svelte';

	export let loading = false;

	const submitForm: SubmitFunction = ({}) => {
		loading = true;

		return async ({ update }) => {
			loading = false;
			await update();
		};
	};
</script>

<form action="?/addBrand" method="POST" use:enhance={submitForm}>
	<input type="hidden" name="table" value="brand" />
	<div class="form-group">
		<TextArea
			labelText="Name"
			name="name"
			helperText="Can contain multiple items, one per line no commas."
		/>
	</div>
	<div class="form-group">
		<Button type="submit">Add Brand</Button>
	</div>
</form>
