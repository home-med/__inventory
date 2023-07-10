<script lang="ts">
	import { AddBrand } from '$lib/components/Database/AddBrand';
	import { AddVendor } from '$lib/components/Database/AddVendor';
  import { AddProduct } from '$lib/components/Database/Product/Add';
	import { AddLocation } from '$lib/components/Database/AddLocation';
	import { Search as ProductSearch } from '$lib/components/Database/Product/Search';
	import { AllElements } from '$lib/components/Database/AllElements';
	import { Accordion, AccordionItem } from 'carbon-components-svelte';
</script>

<svelte:head>
  <title>Database administration</title>
</svelte:head>

<Accordion>
  <AccordionItem title="Add Brand">
    <AddBrand />
  </AccordionItem>

  <AccordionItem title="Add Vendor">
    <AddVendor />
  </AccordionItem>
  
  <AccordionItem title="Add Product">
    <AddProduct />
  </AccordionItem>

  <AccordionItem title="Add Location">
    <AddLocation />
  </AccordionItem>

  <AccordionItem title="Product Search">
    <ProductSearch />
  </AccordionItem>

  <AccordionItem title="All Elements">
    <AllElements />
  </AccordionItem>
</Accordion>
