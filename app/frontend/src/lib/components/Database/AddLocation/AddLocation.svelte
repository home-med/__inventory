<script lang="ts">
	import { Tab, TabContent, Tabs } from 'carbon-components-svelte';
	import { Single } from './Tabs';
	import { submitForm } from '../db_utils';
</script>

<Tabs>
	<Tab label="Single Item" />
	<svelte:fragment slot="content">
		<TabContent><Single on:submit={submitForm} /></TabContent>
	</svelte:fragment>
</Tabs>
