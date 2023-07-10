<script lang="ts">
	import { MultipleItems, SingleItem, UploadFiles } from './Pages';
	import { Tabs, Tab, TabContent } from 'carbon-components-svelte';
</script>

<Tabs>
	<Tab label="Single Item" />
	<Tab label="Mulitple Items" />
	<Tab label="File Upload" />
	<svelte:fragment slot="content">
		<TabContent><SingleItem /></TabContent>
		<TabContent><MultipleItems /></TabContent>
		<TabContent><UploadFiles /></TabContent>
	</svelte:fragment>
</Tabs>
