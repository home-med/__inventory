<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { TLocation } from '$lib/types';

	import {Button} from '$lib/components/Elements/Button';
	import {TextInput} from '$lib/components/Elements/TextInput';
	import {Checkbox} from '$lib/components/Elements/Checkbox';

	export let loading = false;
	export let locations: TLocation[] = [];

	const submitForm: SubmitFunction = (input) => {
		loading = true;

		return async ({ update }) => {
			loading = false;
			await update();
		};
	};

	const setAllVisibility = () => {

	}
</script>

<details>
	<summary>Set Product Visibility</summary>
	<form action="?/setVisibility" method="POST" use:enhance={submitForm}>
		<div class="form-group">
			<TextInput label="Product" name="product" />
		</div>
		{#each locations as location (location.id)}
			{location.name}
			<div class="form-group">
				<Checkbox labelText="Active?" name="active" value={location.id} />
			</div>
		{/each}
		<Button type="submit" {loading} on:click={setAllVisibility}>Set all visibility</Button>
	</form>
</details>

<style>
</style>
