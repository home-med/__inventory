<script lang="ts">
	import Textarea from "$lib/components/Elements/Textarea.svelte";
  
  let csv: string;
  let filter: string;

  const filterFunc = () => {
    let itemsArr: any[] = [...new Set(csv.split(/\r?\n|\n/))]
    itemsArr = [itemsArr
      .reduce((memo, [key, value]) => ({
          ...memo,
          [key]: value,
        }), {})];
    const filterArr: string[] = [...new Set(filter.split(/\r?\n|\n/))];

    console.info('ITEMS:',itemsArr)
    console.info('FILTER:',filterArr)

    let results = itemsArr.filter(item => !filterArr.includes(item));
    console.log('RESULTS:',results)
  }
</script>

<h1>Miscellaneous Functions</h1>
<p>These items really have no home, just one off things that I needed for one reason or another.
  Some will be helpful in day-to-day ops, if that ends up being the case it'll move to another
  section.
</p>

<details>
  <summary>Filter csv of items by list of items.</summary>
  <div class="form-group">
    <Textarea label="CSV Values" name="csv" help_text="One item per line" bind:value={csv} on:change={filterFunc}></Textarea>
    </div>
    <div class="form-group">
    <Textarea label="Values to find" name="vals" help_text="One item per line" bind:value={filter} on:change={filterFunc}></Textarea>
  </div>
</details>
<style>
  
</style>
