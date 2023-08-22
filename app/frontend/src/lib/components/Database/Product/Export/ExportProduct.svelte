<script lang="ts">
	import Tab from "$lib/components/Elements/Tab.svelte";
	import TabContent from "$lib/components/Elements/TabContent.svelte";
import Tabs from "$lib/components/Elements/Tabs.svelte";

let active = true;
</script>

<section>
	<Tabs>
		<Tab label="Tab1" bind:active />
		<Tab label="Tab2" />
		<Tab label="Tab3" />
		<TabContent></TabContent>
	</Tabs>
	
</section>
