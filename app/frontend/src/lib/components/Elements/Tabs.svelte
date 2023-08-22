<script lang="ts">
  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  let selectedTab = writable(undefined);

  setContext('tabs', {
    selectedTab
  });
</script>
<ul
  class="flex flex-col flex-wrap pl-0 mr-4 list-none"
  role="tablist">
  <slot />
</ul>
