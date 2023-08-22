<script lang="ts">
	export let label: string = '';
	export let active: boolean = false;
</script>

<li role="presentation">
	<a
		href="#tabs-home"
		class="block px-7 pt-4"
		class:border-b-2={active}
		class:border-gray-200={active}
		class:border-solid={active}
		role="tab"
		aria-controls="tabs-home"
		aria-selected="true"
	>
		{label}
	</a>
</li>
