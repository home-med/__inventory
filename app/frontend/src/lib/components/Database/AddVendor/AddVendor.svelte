<script lang="ts">
	import { submitForm } from "../db_utils";
	import {Multiple, Single} from "./Tabs";
	import { Tabs, Tab, TabContent } from 'carbon-components-svelte';
</script>

<Tabs>
	<Tab label="Single Item" />
	<Tab label="Mulitple Items" />
	<svelte:fragment slot="content">
		<TabContent><Single on:submit={submitForm} /></TabContent>
		<TabContent><Multiple on:submit={submitForm} /></TabContent>
	</svelte:fragment>
</Tabs>


