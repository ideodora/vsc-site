<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { pageHistory, pageHistoryArray } from '$lib/shared/store/page-history';
	import Close from 'svelte-google-materialdesign-icons/Close.svelte';

	let activePath: string | null;

	const onClickTab = (history: any) => {
		goto(history.path);
	};
	const onKeydownTab = (event: KeyboardEvent, history: any) => {
		console.log(event);
		if (event.key === 'Enter') {
			onClickTab(history);
		}
	};

	const onClickClearTab = (history: any) => {
		pageHistory.delete(history.path);
		const otherPath = $pageHistoryArray.slice(-1).pop();
		if (otherPath) {
			goto(otherPath.path);
		}
	};

	$: activePath = $page.route.id;
</script>

<div class="tabs bg-stone-900 flex gap-x-px text-xs">
	{#each $pageHistoryArray as history}
		<div
			class="tab py-2 px-4 group flex cursor-pointer"
			class:active={history.path === activePath}
			on:click={() => onClickTab(history)}
			on:keydown={(event) => onKeydownTab(event, history)}
		>
			<div class="mr-2">{history.label}</div>
			<button
				class="invisible group-hover:visible group-[.active]:visible"
				type="button"
				on:click={() => onClickClearTab(history)}
			>
				<Close size={16} />
			</button>
		</div>
	{/each}
</div>

<style lang="postcss">
	.tab {
		@apply bg-[#343530];
	}
	.tab.active {
		@apply bg-[#272823];
	}
</style>
