<script lang="ts">
	import type { PageData } from './$types';
	import type { BrandResponse, LocationResponse, VendorResponse } from '$lib/pocketbase-types';

	import {
		Button,
		Form,
		FormGroup,
		Select,
		SelectItem,
		TextArea,
		TextInput
	} from 'carbon-components-svelte';
	import { Toasts, addToast } from '$lib/stores/toast';
	import SetVisibility from '$lib/components/Database/SetVisibility/SetVisibility.svelte';

	export let data: PageData;

	const brands: BrandResponse[] = data.brands;
	const vendors: VendorResponse[] = data.vendors;
	const locations: LocationResponse[] = data.locations;

	let product = data.product;
	let id: string = product.id || '';
	let item: string = product.item || '';
	let upc: string = product.upc || '';
	let ean: string = product.ean || '';
	let manufact_sku: string = product.manufact_sku || '';
	let custom_sku: string = product.custom_sku || '';
	let notes: string = product.notes || '';
	let vendor: string = product.expand?.vendor?.id || '';
	let brand: string = product.expand?.brand?.id || '';
	let visibilities: string[] = product.visibility;

	let name;

	const updateItem = (e: Event) => {
		if (!(e.target instanceof HTMLFormElement)) return;
		e.preventDefault();
		addToast({
			type: Toasts.INFO,
			message: 'Nothing to do :('
		});
	};
</script>

{#if !product}
	<h1>No product</h1>
	>
{:else}
	<Form action="?/updateItem" method="POST" on:submit={updateItem}>
		<input type="hidden" value="Product" name="table" />
		<FormGroup legendText="Product Identifier" style="display: flex; flex-direction: row; justify-content: space-between; gap: 0 0.25rem;" >
			<TextInput
				bind:value={item}
				name="item"
				labelText={'Product | ID [ ' + (id ?? 'Cannot find ID') + ' ]'}
			/><br />
			<TextInput bind:value={upc} name="upc" labelText="UPC" /><br />
			<TextInput bind:value={ean} name="ean" labelText="EAN" /><br />
			<TextInput bind:value={manufact_sku} name="manufact_sku" labelText="Manufacturer SKU" /><br />
			<TextInput bind:value={custom_sku} name="custom_sku" labelText="Custom SKU" /><br />
		</FormGroup>
		<FormGroup legendText="Product Specifications">
			<Select
				labelText="Product Brand"
				selected={brand || undefined}
				bind:value={brand}
				name="brand"
				helperText="Value cannot be empty when updating."
			>
				<SelectItem value="" text="" />
				{#each brands as brand (brand.id)}
					<SelectItem value={brand.id} text={brand.name} />
				{/each}
			</Select><br />
			<Select
				labelText="Product Vendor"
				selected={vendor || undefined}
				bind:value={vendor}
				name="vendor"
				helperText="Value cannot be empty when updating."
			>
				<SelectItem value="" text="" />
				{#each vendors as vendor (vendor.id)}
					<SelectItem value={vendor.id} text={vendor.vendor} />
				{/each}
			</Select>

			<SetVisibility selected={visibilities} />
		</FormGroup>
		<FormGroup>
			<TextArea bind:value={notes} name="notes" labelText="Notes" />
		</FormGroup>
		<FormGroup>
			<Button type="submit">Edit Product</Button>
		</FormGroup>
	</Form>
{/if}
