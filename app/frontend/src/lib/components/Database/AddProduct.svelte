<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import type { Option, TLocation } from '$lib/types';

	import Select from '../Elements/Select.svelte';
	import Button from '../Elements/Button.svelte';
	import TabPage from '../Elements/TabPage.svelte';
	import Input from '../Elements/Input.svelte';
	import Textarea from '../Elements/Textarea.svelte';
	import Checkbox from '../Elements/Checkbox.svelte';

	export let loading = false;
	export let brands: Option[];
	export let vendors: Option[];
	export let locations: TLocation[] = [];

	let allLocations:boolean = true;

	const tabs = [
		{
			id: 'single',
			label: 'Single Item',
		},
		{
			id: 'multi',
			label: 'Multiple Items',
			active: true,
		}
	];

	const submitForm: SubmitFunction = (input) => {
		loading = true;
		console.log('SubmitFunction => [INPUT]:', input);

		return async () => {
			loading = false;
			input.form.reset();
		};
	};
</script>

<div>
	<details>
		<summary>Add Products</summary>
		<TabPage {tabs}>
			<div class="content" data-tab-id="single">
				<form action="?/addProduct" method="POST" use:enhance={submitForm}>
					<input type="hidden" name="quantity" value="single" />
					<div class="form-group">
						<Input label="Name" name="name" help_text="Product Name" />
					</div>
					<div class="form-group">
						<Input label="UPC" name="upc" help_text="UPC number" />
						<Input label="EAN" name="ean" help_text="EAN number" />
					</div>
					<div class="form-group">
						<Input label="Custom SKU" name="custom_sku" help_text="Our SKU" required />
						<Input
							label="Manufacturer SKU"
							name="manufact_sku"
							help_text="The brands SKU"
							required
						/>
					</div>
					<div class="form-group">
						<Select
							label="Brands"
							name="brand"
							options={brands}
							help_text="Who makes the item"
							required
						/>
						<Select
							label="Vendors"
							name="vendor"
							options={vendors}
							help_text="Who we get the item from."
							required
						/>
					</div>
					<div class="form-group">
						<Button type="submit" {loading}>Add Product</Button>
					</div>
				</form>
			</div>
			<div class="content content--active" data-tab-id="multi">
				<form action="?/addProduct" method="POST" use:enhance={submitForm}>
					<input type="hidden" name="quantity" value="multi" />

					<div class="form-group">
						<Textarea
							label="Products"
							name="products"
							help_text="Copy / Paste the csv values. Each line is its own item."
						/>
					</div>
					<div class="form-group">
						<Checkbox label="Set visible to all locations?" name="visibility_all" bind:checked={allLocations} />
						</div>
						<p style="text-align: left">Set visibility to a specific site</p>
						<div class="form-group">
						{#each locations as location}
							<Checkbox label={location.name} name={"visibility_" + location.short_name} disabled={allLocations} checked={allLocations} />
						{/each}
					</div>
					<div class="form-group">
						<Button type="submit" {loading}>Add Products</Button>
					</div>
				</form>
			</div>
		</TabPage>
	</details>
</div>

<style>
	.content {
		display: none;
	}

	.content--active {
		display: block;
	}
</style>
