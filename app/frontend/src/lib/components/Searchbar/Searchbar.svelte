<script lang="ts">
  import { Search } from "carbon-components-svelte";
	import { SearchItem } from "./SearchItem";
  
  export let searchField = "";

  type Data = {
    display: string
    index: string
  }

  const data: Data[]  = [{
    "display": "Item Name",
    "index": "item",
  }, {
    "display": "Custom SKU",
    "index": "custom_sku",
  }, {
    "display": "Manufacturer's SKU",
    "index": "manufact_sku",
  }, {
    "display": "Internal ID",
    "index": "id",
  }];

  let url: string = "";
  let searchTerm = '';
  let searchResults: any[] = [];
  let timeout: any = null;


  const handleSearch = () => {
    url =`http://127.0.0.1:8090/api/collections/product/records?page=1&perPage=10&filter=${searchField}~"${searchTerm}"`;
    console.log(url);
		if (!searchTerm || searchTerm.length < 2 || !searchField) {searchResults = []; return;}
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(getResults, 300);
	};

	const getResults = async (): Promise<void> => {
		const results = await fetch(url);
    const json = await results.json();
    const filter_by_name = json.items.filter((e: Record<string, string>) => e[searchField].toLowerCase().startsWith(searchTerm.toLowerCase())).sort();
    const filter_remaining = json.items.filter((e: Record<string, string>) => !e[searchField].toLowerCase().startsWith(searchTerm.toLowerCase())).sort();
		searchResults = filter_by_name.concat(filter_remaining);
	};

</script>

<Search size="lg" bind:value={searchTerm} on:input={handleSearch} on:clear={() => searchResults = []} />
<div class="resultContainer">
  <ul>
    {#each searchResults as result (result.id)}
    <SearchItem item={result} {data} on:pick />
    {:else}
    <li>No items to show</li>
    {/each}
  </ul>
</div>

<style>
  .resultContainer {
    position: relative;
    background-color: var(--white);
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    font-size: 0.5rem;
  }
  
</style>
