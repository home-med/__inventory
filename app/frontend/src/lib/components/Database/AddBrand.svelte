<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import {Button} from '$lib/components/Elements/Button';
	import {TextArea} from '$lib/components/Elements/TextArea';

	export let loading = false;

	const submitForm: SubmitFunction = ({}) => {
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
			<TextArea
				labelText="Name"
				name="name"
				helpText="Can contain multiple items, one per line no commas."
			/>
		</div>
		<div class="form-group">
			<Button type="submit" {loading}>Add Brand</Button>
		</div>
	</form>
</details>
