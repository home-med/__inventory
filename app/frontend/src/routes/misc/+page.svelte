<script lang="ts">
	import { Button, TextArea } from "carbon-components-svelte";

	let csv: string;
	let filter: string;
  let loading: boolean = false;

	const filterFunc = () => {
		let itemsArr: any[] = [...new Set(csv.split(/\r?\n|\n/))];
		itemsArr = [
			itemsArr.reduce(
				(memo, [key, value]) => ({
					...memo,
					[key]: value
				}),
				{}
			)
		];
		const filterArr: string[] = [...new Set(filter.split(/\r?\n|\n/))];

		console.info('ITEMS:', itemsArr);
		console.info('FILTER:', filterArr);

		let results = itemsArr.filter((item) => !filterArr.includes(item));
		console.log('RESULTS:', results);
	};
</script>

<h1>Miscellaneous Functions</h1>
<p>
	These items really have no home, just one off things that I needed for one reason or another. Some
	will be helpful in day-to-day ops, if that ends up being the case it'll move to another section.
</p>

<details>
	<summary>Filter csv of items by list of items.</summary>
	<div class="form-group">
		<TextArea
			labelText="CSV Values"
			name="csv"
			helperText="One item per line"
			bind:value={csv}
		/>
	</div>
	<div class="form-group">
		<TextArea
			labelText="Values to find"
			name="vals"
			helperText="One item per line"
			bind:value={filter}
		/>
	</div>
  <div class="form-group">
    <Button type="submit" >Submit</Button>
  </div>
</details>

<style>
</style>
