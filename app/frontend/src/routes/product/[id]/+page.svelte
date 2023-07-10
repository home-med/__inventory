<script lang="ts">
	import type { PageData } from './$types';

	import { Button, Form, FormGroup, Select, SelectItem, TextArea, TextInput } from 'carbon-components-svelte';
	import { siteStore } from '$lib/stores/site';
	import { enhance } from '$app/forms';

	export let data: PageData;

	let product = data.product;
	let id: string = product.id;
	let item: string = product.item;
	let upc: string = product.upc;
	let ean: string = product.ean;
	let manufact_sku: string = product.manufact_sku;
	let custom_sku: string = product.custom_sku;
	let notes: string = product.notes;
	let vendor: string = product.expand?.vendor.id || "";
	let brand: string = product.expand?.brand.id || "";

	const brands = $siteStore.brands;
	const vendors = $siteStore.vendors;

  const updateItem = (args: any) => {
    console.log(args);
  }
</script>

{#if !product}
<h1>No product</h1>>
{:else}
<form action="?/updateItem" method="POST" use:enhance={updateItem}>
  <input type="hidden" value="Product" name="table" />
  <FormGroup legendText="Product Identifier" class="formGroup">
    <TextInput bind:value={item} labelText={"Product | ID [ " + id + " ]"}  /><br />
  </FormGroup>
  <FormGroup class="formGroup">
    <TextInput bind:value={upc} labelText="UPC" /><br />
    <TextInput bind:value={ean} labelText="EAN" /><br />
  </FormGroup>
  <FormGroup class="formGroup">
    <TextInput bind:value={manufact_sku} labelText="Manufacturer SKU" /><br />
    <TextInput bind:value={custom_sku} labelText="Custom SKU" /><br />
  </FormGroup>
  <FormGroup class="formGroup">
    <Select labelText="Product Brand" selected={brand || undefined} bind:value={brand}>
      {#each brands as brand (brand.id)}
      <SelectItem value={brand.id} text={brand.name} />
      {/each}
    </Select><br />
    <Select labelText="Product Vendor" selected={vendor || undefined} bind:value={vendor}>
      {#each vendors as vendor (vendor.id)}
      <SelectItem value={vendor.id} text={vendor.name} />
      {/each}
    </Select><br />
  </FormGroup>
	<FormGroup>
    <TextArea bind:value={notes} labelText="Notes" />
  </FormGroup>
  <FormGroup>
    <Button type="submit">Edit Product</Button>
  </FormGroup>
</form>
{/if}

<style>
  :global(.formGroup) {
    display: flex;
    gap: 0.25rem;
  }
</style>
