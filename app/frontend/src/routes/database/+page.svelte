<script lang="ts">
	import type { PageData } from './$types';

  import type {TLocation, Option} from '$lib/types';
	import AddBrand from '$lib/components/Database/AddBrand.svelte';
	import AddVendor from '$lib/components/Database/AddVendor.svelte';
  import AddProduct from '$lib/components/Database/AddProduct.svelte';
	import SetVisibility from '$lib/components/Database/SetVisibility.svelte';
	import AddLocation from '$lib/components/Database/AddLocation.svelte';

  export let data: PageData;

  const brands: Option[] = data.brands.map(item => ({text: item.name, value: item.id}));
  const vendors: Option[] = data.vendors.map(item => ({text: item.name, value: item.id}));
  const locations: TLocation[] = data.locations

  let loading = false;
</script>

<svelte:head>
  <title>Database administration</title>
</svelte:head>

<div>
  <AddBrand {loading} />

  <AddVendor {loading} />
  
  <AddProduct {loading} {brands} {vendors} {locations} />

  <AddLocation {loading} />

  <SetVisibility {loading} {locations} />
</div>


<style>
</style>
