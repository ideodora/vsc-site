<script>
	import Toolbar from '$lib/components/toolbar/index.svelte';
	import Explorer from '$lib/components/explorer/index.svelte';
	import FileTabs from '$lib/components/file-tabs/index.svelte';
</script>

<div class="grid h-full overflow-hidden">
	<div class="bg-secondary">
		<Toolbar />
	</div>
	<div class="bg-base-900">
		<Explorer />
	</div>
	<div class="editor-pane bg-base-400 text-gray-50">
		<FileTabs />
		<slot />
	</div>
</div>

<style lang="postcss">
	.grid {
		grid-template-columns: 48px 200px 1fr;
		grid-template-rows: 100%;
	}

	.editor-pane {
		@apply grid;
		grid-template-columns: 1fr;
		grid-template-rows: min-content min-content 1fr;
	}
</style>
