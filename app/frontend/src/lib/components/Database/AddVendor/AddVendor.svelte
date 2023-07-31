<script lang="ts">
	import { submitForm } from "../db_utils";
	import { Single, File } from "./Tabs";
	import { Tabs, Tab, TabContent } from 'carbon-components-svelte';
</script>

<Tabs>
	<Tab label="File upload" />
	<Tab label="Single Item" />
	<svelte:fragment slot="content">
		<TabContent><File on:submit={submitForm} /></TabContent>
		<TabContent><Single on:submit={submitForm} /></TabContent>
	</svelte:fragment>
</Tabs>


