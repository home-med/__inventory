<script lang="ts">
	import AddBrand from '$lib/components/Database/Brand/Add/AddBrand.svelte';
	import AddVendor from '$lib/components/Database/Vendor/Add/AddVendor.svelte';
	import AddProduct from '$lib/components/Database/Product/Add/AddProduct.svelte';
	import AddLocation from '$lib/components/Database/Location/Add/AddLocation.svelte';
	import ProductSearch from '$lib/components/Database/Product/Search/Search.svelte';
	import { Accordion, AccordionItem, Tab } from 'carbon-components-svelte';
	import type { PageData } from './$types';
	import ExportProduct from '$lib/components/Database/Product/Export/ExportProduct.svelte';

	export let data: PageData;
	const brands = data.brands;
	const vendors = data.vendors;
	const locations = data.locations;
	const products = data.products;
</script>

<svelte:head>
	<title>Database administration</title>
</svelte:head>
<section>
	<h1 class="text-3xl">Add items to database</h1>
	<Accordion>
		<AccordionItem title="Add Brand">
			<AddBrand />
		</AccordionItem>

		<AccordionItem title="Add Vendor">
			<AddVendor />
		</AccordionItem>

		<AccordionItem title="Add Product">
			<AddProduct {locations} />
		</AccordionItem>

		<AccordionItem title="Add Location">
			<AddLocation />
		</AccordionItem>

		<AccordionItem title="Product Search">
			<ProductSearch />
		</AccordionItem>
	</Accordion>
</section>

<section class="mt-6">
	<h1 class="text-3xl">Export data from database</h1>
	<Accordion>
		<AccordionItem title="Export Product">
			<ExportProduct />
		</AccordionItem>
	</Accordion>
</section>
