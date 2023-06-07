<script lang="ts">
	import { enhance} from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import {Button} from '$lib/components/Elements/Button';
	import {Checkbox} from '$lib/components/Elements/Checkbox';
	import {TextInput} from '$lib/components/Elements/TextInput';

	export let loading = false;

	const submitForm: SubmitFunction = (input) => {
		loading = true;

		return async ({ update }) => {
			loading = false;
		};
	};
</script>

<details>
	<summary>Add Location</summary>
	<form action="?/addLocation" method="POST" use:enhance={submitForm}>
		<input type="hidden" name="table" value="vendor" />
		<div class="form-group">
			<TextInput
				labelText="Location Name"
				name="name"
				helpText="Full proper name of the location"
			/>
			<TextInput
				labelText="Location Short Name"
				name="short_name"
				helpText="Name abbreviation 3-4 characters"
			/>
		</div>
		<div class="form-group">
			<Checkbox name="active" />
		</div>
		<div class="form-group">
			<Button type="submit" {loading}>Add Vendor</Button>
		</div>
	</form>
</details>
