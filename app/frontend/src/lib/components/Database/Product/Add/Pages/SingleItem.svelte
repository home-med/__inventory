<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Select, SelectItem, TextInput } from 'carbon-components-svelte';
	import { siteStore } from '$lib/stores/site';

	import SetVisibility from '$lib/components/Database/SetVisibility/SetVisibility.svelte';

	import type { BrandResponse, VendorResponse } from '$lib/pocketbase-types';

	const brands: BrandResponse[] = $siteStore.brands;
	const vendors: VendorResponse[] = $siteStore.vendors;
</script>

<form action="?/addProductSingle" method="POST" use:enhance>
	<div class="form-group">
		<TextInput labelText="Name" name="item" helperText="Product Name" />
	</div>
	<div class="form-group">
		<TextInput labelText="UPC" name="upc" helperText="UPC number" />
		<TextInput labelText="EAN" name="ean" helperText="EAN number" />
	</div>
	<div class="form-group">
		<TextInput labelText="Custom SKU" name="custom_sku" helperText="Our SKU" required />
		<TextInput
			labelText="Manufacturer SKU"
			name="manufact_sku"
			helperText="The brands SKU"
			required
		/>
	</div>
	<div class="form-group">
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
	</div>
	<SetVisibility />
	<div class="form-group">
		<Button type="submit">Add Product</Button>
	</div>
</form>
