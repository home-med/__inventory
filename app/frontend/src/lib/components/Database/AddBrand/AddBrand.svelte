<script lang="ts">
	import { Tab, TabContent, Tabs } from 'carbon-components-svelte';
	import { Single,  File } from './Tabs';
	import { submitForm } from '../db_utils';
</script>

<Tabs>
	<Tab label="File upload" />
	<Tab label="Single Item" />
	<svelte:fragment slot="content">
		<TabContent><File on:submit={submitForm} /></TabContent>
		<TabContent><Single on:submit={submitForm} /></TabContent>
	</svelte:fragment>
</Tabs>
