<script lang="ts">
	import { pageHistoryArray } from '$lib/shared/store/page-history';
	import Tab from './tab.svelte';
</script>

<div class="tabs bg-base-900 flex gap-x-px text-xs">
	{#each $pageHistoryArray as history}
		<Tab {history} />
	{/each}
</div>

<style lang="postcss">
</style>
