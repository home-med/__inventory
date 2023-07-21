<script lang="ts">
	import { Tab, TabContent, Tabs } from 'carbon-components-svelte';
	import { Single, Multiple } from './Tabs';
	import { submitForm } from '../db_utils';
</script>

<Tabs>
	<Tab label="Single Item" />
	<Tab label="Mulitple Items" />
	<svelte:fragment slot="content">
		<TabContent><Single on:submit={submitForm} /></TabContent>
		<TabContent><Multiple on:submit={submitForm} /></TabContent>
	</svelte:fragment>
</Tabs>
