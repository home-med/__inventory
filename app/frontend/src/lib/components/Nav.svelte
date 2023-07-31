<script lang="ts">
  import { base } from "$app/paths";
  const links: string[][] = [
    ["Home", "/"],
    ["Product", "/product"]
,   ["Database", "/database"],
    ["Miscellaneous", "/misc"],
    ["About", "/about"],
    ["Long", "/long"],
  ];
</script>

<nav>
<ul>
  {#each links as [text, href]}
  <li><a {href}>{text}</a></li>
  {/each}
</ul>
</nav>

<style>
ul {
  display: flex;
  justify-content: space-around;
}
</style>
