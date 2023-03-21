<script>
	import Toolbar from '$lib/components/toolbar/index.svelte';
	import Explorer from '$lib/components/explorer/index.svelte';
	import FileTabs from '$lib/components/file-tabs/index.svelte';
	import { sidebarHidden } from '$lib/shared/store/layout';
</script>

<div class="wrap grid h-full overflow-hidden" class:no-sidebar={$sidebarHidden}>
	<div class="bg-secondary">
		<Toolbar />
	</div>
	{#if !$sidebarHidden}
		<div class="bg-base-900">
			<Explorer />
		</div>
	{/if}
	<div class="editor-pane bg-base-400 text-gray-50">
		<FileTabs />
		<slot />
	</div>
</div>

<style lang="postcss">
	.wrap {
		grid-template-columns: 48px 200px 1fr;
		grid-template-rows: 100%;
	}
	.wrap.no-sidebar {
		grid-template-columns: 48px 1fr;
		grid-template-rows: 100%;
	}

	.editor-pane {
		@apply grid;
		grid-template-columns: 1fr;
		grid-template-rows: min-content min-content 1fr;
	}
</style>
