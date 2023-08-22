<script lang="ts">
  const links: string[][] = [
    ["Home", "/"],
    ["Product", "/product"],
    ["Database", "/database"],
    ["Miscellaneous", "/misc"],
  ];
</script>

<nav>
<ul class="flex justify-between">
  {#each links as [text, href]}
  <li><a {href}>{text}</a></li>
  {/each}
</ul>
</nav>
