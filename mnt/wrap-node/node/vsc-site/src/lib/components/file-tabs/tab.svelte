<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { pageHistory, pageHistoryArray } from '$lib/shared/store/page-history';
	import Close from 'svelte-google-materialdesign-icons/Close.svelte';
	import Code from 'svelte-google-materialdesign-icons/Code.svelte';
	import TabContext from './tab-context.svelte';
	import { tooltip } from './tab-context';

	export let history: { path: string; label: string };

	let activePath: string | null;
	let isOpeningContextMenu = false;

	const goToPage = () => {
		goto(history.path);
	};
	const onKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			goToPage();
		}
	};

	const clearHistory = () => {
		if ($pageHistoryArray.length > 1) {
			pageHistory.delete(history.path);
			const otherPath = $pageHistoryArray.slice(-1).pop()!;
			goto(otherPath.path);
		}
	};

	$: activePath = $page.route.id;
</script>

<div
	class="tab py-2 px-4 group flex cursor-pointer select-none"
	class:active={history.path === activePath}
	on:click={goToPage}
	on:keydown={onKeydown}
	use:tooltip={{ content: TabContext, history }}
>
	<Code size={16} class="text-secondary" />
	<div class="mx-1">{history.label}</div>
	<button
		class="invisible group-hover:visible group-[.active]:visible"
		type="button"
		on:click={clearHistory}
	>
		<Close size={16} />
	</button>
</div>

{#if isOpeningContextMenu}
	<div class="bg-green-500 absolute">hei this is context menu</div>
{/if}

<style lang="postcss">
	.tab {
		@apply bg-base-50;
	}
	.tab.active {
		@apply bg-base-400;
	}
</style>
