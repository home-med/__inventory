<script lang="ts">
	import AddBrand from '$lib/components/Database/Brand/Add/AddBrand.svelte';
	import AddVendor from '$lib/components/Database/Vendor/Add/AddVendor.svelte';
	import AddProduct from '$lib/components/Database/Product/Add/AddProduct.svelte';
	import AddLocation from '$lib/components/Database/Location/Add/AddLocation.svelte';
	import ProductSearch from '$lib/components/Database/Product/Search/Search.svelte';
	import type { PageData } from './$types';
	import ExportProduct from '$lib/components/Database/Product/Export/ExportProduct.svelte';
	import { Accordion, AccordionItem } from '$lib/components/Elements';

	export let data: PageData;
	const locations = data.locations;
</script>

<svelte:head>
	<title>Database administration</title>
</svelte:head>
<section>
	<h1 class="text-3xl">Add items to database</h1>
	<Accordion>
		<AccordionItem label="Add Brand">
			<AddBrand />
		</AccordionItem>

		<AccordionItem label="Add Vendor">
			<AddVendor />
		</AccordionItem>

		<AccordionItem label="Add Product">
			<AddProduct {locations} />
		</AccordionItem>

		<AccordionItem label="Add Location">
			<AddLocation />
		</AccordionItem>

		<AccordionItem label="Product Search">
			<ProductSearch />
		</AccordionItem>
	</Accordion>
</section>

<section class="mt-6">
	<h1 class="text-3xl">Export data from database</h1>
	<Accordion>
		<AccordionItem label="Export Product">
			<ExportProduct />
		</AccordionItem>
	</Accordion>
</section>
