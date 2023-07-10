<script lang="ts">
	import { Select, SelectItem } from 'carbon-components-svelte';
	import { Searchbar } from '$lib/components/Searchbar';
	import { goto } from '$app/navigation';

	let searchField = '';

	const onPick = (e: CustomEvent) => {
		goto(`/product/${e.detail.id}`);
	};
</script>

<form action="#" method="POST" on:submit|preventDefault>
	<div class="form-group">
		<Select labelText="Search field" bind:selected={searchField}>
			<SelectItem value="system_id" text="System ID" disabled />
			<SelectItem value="id" text="Internal ID" />
			<SelectItem value="item" text="Item Name" />
			<SelectItem value="manufact_sku" text="Manufacturer's SKU" />
			<SelectItem value="custom_sku" text="Custom SKU" />
		</Select>
		<Searchbar {searchField} on:pick={onPick} />
	</div>
</form>
