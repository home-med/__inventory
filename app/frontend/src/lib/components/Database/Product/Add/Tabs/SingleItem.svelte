<script lang="ts">
	import type { BrandResponse, VendorResponse } from '$lib/pocketbase-types';
	import { createEventDispatcher } from 'svelte';
	
	import { Button, Form, FormGroup, Select, SelectItem, TextInput } from 'carbon-components-svelte';
	
	import { siteStore } from '$lib/stores/site';
	import SetVisibility from '$lib/components/Database/SetVisibility/SetVisibility.svelte';

	const brands: BrandResponse[] = $siteStore.brands;
	const vendors: VendorResponse[] = $siteStore.vendors;
	const dispatch = createEventDispatcher();

function handleSubmit(event: Event) {
	if (!(event.target instanceof HTMLFormElement)) return;
	event.preventDefault();
	const data = new FormData(event.target);
	dispatch('submit', { event, data });
}
</script>

<Form action="?/addProductSingle" method="POST" on:submit={handleSubmit}>
	<FormGroup>
		<TextInput labelText="Name" name="item" helperText="Product Name" />
	</FormGroup>
	<FormGroup>
		<TextInput labelText="UPC" name="upc" helperText="UPC number" />
		<TextInput labelText="EAN" name="ean" helperText="EAN number" />
	</FormGroup>
	<FormGroup>
		<TextInput labelText="Custom SKU" name="custom_sku" helperText="Our SKU" required />
		<TextInput
			labelText="Manufacturer SKU"
			name="manufact_sku"
			helperText="The brands SKU"
			required
		/>
	</FormGroup>
	<FormGroup>
		<Select labelText="Brands" name="brand" helperText="Who makes the item" required>
			{#each brands as brand}
				<SelectItem value="{brand.id}" text="{brand.name}" />
			{/each}
		</Select>
		<Select labelText="Vendors" name="vendor" helperText="Who we get the item from." required>
			{#each vendors as vendor}
				<SelectItem value="{vendor.id}" text="{vendor.name}" />
			{/each}
		</Select>
	</FormGroup>
	<SetVisibility />
	<FormGroup>
		<Button type="submit">Add Product</Button>
	</FormGroup>
</Form>
