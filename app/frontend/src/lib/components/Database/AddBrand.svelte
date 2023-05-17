<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import Button from '$lib/components/Elements/Button.svelte';
	import Textarea from '$lib/components/Elements/Textarea.svelte';

	export let loading = false;

	const submitForm: SubmitFunction = (input) => {
		loading = true;

		return async ({ update }) => {
			loading = false;
			await update();
		};
	};
</script>

<details>
	<summary>Add Brand</summary>
	<form action="?/addBrand" method="POST" use:enhance={submitForm}>
		<input type="hidden" name="table" value="brand" />
		<div class="form-group">
			<Textarea
				label="Name"
				name="name"
				help_text="Can contain multiple items, one per line no commas."
			/>
		</div>
		<div class="form-group">
			<Button type="submit" {loading}>Add Brand</Button>
		</div>
	</form>
</details>
