<script lang="ts">
	export let tabs = [{
		id: "test1",
		label: "Test 1",
		active: true
	}, {
		id: "test2",
		label: "Test 2"
	}, {
		id: "test3",
		label: "Test 3"
	}];

	const handleClick = (e: MouseEvent | KeyboardEvent) => {
		const content = [...document.querySelectorAll('.container--content > *')];
		const tabs = [...document.querySelectorAll('.container--tabs > *')];
		const target = e.target as HTMLElement;
		const id = target.getAttribute('data-tab-for')
		if (!id) return;
		content.map(elm => {
			if (elm.getAttribute('data-tab-id') === id) elm.classList.add('content--active');
			else elm.classList.remove('content--active');
		});
		tabs.map(elm => {
			if (elm.getAttribute('data-tab-for') === id) elm.classList.add('tabs--active');
			else elm.classList.remove('tabs--active'); 
		})
	}
</script>

<ul class="container--tabs" on:click={handleClick} on:keydown={handleClick}>
	{#each tabs as tab}
		<li class="tab" class:tabs--active={tab.active} data-tab-for={tab.id}>{tab.label}</li>
	{/each}
</ul>

<div class="container--content">
	<slot />
</div>


<style>
	ul {
		display: flex;
		flex-flow: column nowrap;
	}

	ul li {
		list-style-type: none;
	}

	.container--tabs {
		list-style: none;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: stretch;
		align-content: stretch;
		margin: 0;
		padding: 0;
	}
	.container--tabs .tab {
		padding: 0.25rem 1rem;
		text-align: center;
		cursor: pointer;
		background-color: black;
		color: white;
		transition: background-color 0.25s;
		margin-bottom: 1.25rem;
	}
	.container--tabs .tab:hover {
		background-color: rgba(0, 0, 0, 0.25);
		transition: background-color 0.25s;
		color: white;
	}
	.container--tabs .tabs--active {
		background-color: #fff;
		color: black;
		pointer-events: none;
	}

	:global(.container--content .content) {
		display: none;
		text-align: center;
	}

	:global(.container--content .content--active) {
		display: block;
	}
</style>
