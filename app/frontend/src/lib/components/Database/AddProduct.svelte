<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { Option, TLocation } from '$lib/types';
	import toast from 'svelte-french-toast'

	import {Select} from '$lib/components/Elements/Select';
	import {Button} from '$lib/components/Elements/Button';
	import {TabPage} from '$lib/components/Elements/TabPage';
	import {TextInput} from '$lib/components/Elements/TextInput';
	import {TextArea} from '$lib/components/Elements/TextArea';
	import {Toggle} from '$lib/components/Elements/Toggle';

	export let loading = false;
	export let brands: Option[];
	export let vendors: Option[];
	export let locations: TLocation[] = [];

	let group: string[] = [];
	let batch = 0;
	let total = 0;

	const onChangeLocation = (e: Event): void => {
		const target = e.target as HTMLInputElement;
		const { checked, value } = target;
		if (checked) {
			if (value === 'all') {
				locations.forEach((v) => {
					group = !group.includes(v.id) ? [...group, v.id] : group;
				});
			} else {
				group = group.includes(value) ? group : [...group, value];
			}
		} else {
			group = group.filter((v) => v !== value);
		}
	};

	const tabs = [
		{
			id: 'single',
			label: 'Single Item'
		},
		{
			id: 'multi',
			label: 'Multiple Items',
			active: true
		}
	];

	const onInputProduct = (e: Event) => {
		const target: HTMLTextAreaElement = e.currentTarget as HTMLTextAreaElement;
		if (target.value.match(/\t/g)) {
			target.value.replace(/\t/gi, ',');
		}
	};

	const submitForm: SubmitFunction = ({data, cancel}) => {
		loading = true;

		if (data.get('brand') === "") {
			toast.error("Brand cannot be blank. If it really is, it shouldn't be");
			cancel()
		}

		return async ({ result, update }: { result: any, update: any}) => {
			console.log(result);
			loading = false;
			group = [];
			switch (result.type) {
				case 'success':
					toast.success('Products added.');
					break;
				case 'failure':
					toast.error(result.data.message);
					break;
				default:
					break;
			}
			await update();
		};
	};
</script>

<details>
	<summary>Add Products</summary>
	<TabPage {tabs}>
		<div class="tab-content" data-tab-id="single">
			<form action="?/addProduct" method="POST" use:enhance={submitForm}>
				<input type="hidden" name="quantity" value="single" />
				<div class="form-group">
					<TextInput labelText="Name" name="name" help_text="Product Name" />
				</div>
				<div class="form-group">
					<TextInput labelText="UPC" name="upc" help_text="UPC number" />
					<TextInput labelText="EAN" name="ean" help_text="EAN number" />
				</div>
				<div class="form-group">
					<TextInput labelText="Custom SKU" name="custom_sku" help_text="Our SKU" required />
					<TextInput
						labelText="Manufacturer SKU"
						name="manufact_sku"
						help_text="The brands SKU"
						required
					/>
				</div>
				<div class="form-group">
					<Select
						labelText="Brands"
						name="brand"
						options={brands}
						helpText="Who makes the item"
						required
					/>
					<Select
						labelText="Vendors"
						name="vendor"
						options={vendors}
						helpText="Who we get the item from."
						required
					/>
				</div>
				<div class="form-group">
					<Button type="submit" {loading}>Add Product</Button>
				</div>
			</form>
		</div>
		<div class="tab-content tab-content--active" data-tab-id="multi">
			<form action="?/addProduct" method="POST" use:enhance={submitForm}>
				<input type="hidden" name="quantity" value="multi" />
				{#if batch > 0}
					Processing {batch} of {total}
				{/if}
				<div class="form-group">
					<TextArea
						labelText="Products"
						name="products"
						helpText="Copy / paste CSV file to the input field. Include header row."
						on:input={onInputProduct}
					/>
				</div>
				<div class="form-group">
					<input type="hidden" name="locations" bind:value={group} />
					<Toggle
						labelText="Set visibility to all sites?"
						value="all"
						bind:group
						disabled={locations.length < 2}
						on:change={onChangeLocation}
					/>
				</div>
				<div class="form-group">
					{#each locations as location (location.id)}
						<Toggle
							labelText={location.name}
							bind:group
							value={location.id}
							checked={group.includes(location.id)}
							on:change={onChangeLocation}
							disabled={group.includes('all')}
						/>
					{:else}
						No locations available.
					{/each}
				</div>
				<div class="form-group">
					<Button type="submit" {loading}>Add Products</Button>
				</div>
			</form>
		</div>
	</TabPage>
</details>

<style>
	.tab-content {
		display: none;
	}

	.tab-content--active {
		display: block;
	}
</style>
