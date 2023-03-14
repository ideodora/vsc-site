<script>
	import '../app.css';

	import Toolbar from '$lib/components/toolbar/index.svelte';
	import Explorer from '$lib/components/explorer/index.svelte';
	import FileTabs from '$lib/components/file-tabs/index.svelte';
</script>

<div class="fixed inset-0 bg-gray-800 grid overflow-hidden">
	<div class="bg-orange-500">
		<Toolbar />
	</div>
	<div class="bg-stone-900">
		<Explorer />
	</div>
	<div class="editor-pane bg-stone-800 text-gray-50">
		<FileTabs />
		<slot />
	</div>
	<div class="col-span-3 bg-orange-600 text-white px-2">this is footer</div>
</div>

<style lang="postcss">
	.grid {
		grid-template-columns: 48px 200px 1fr;
		grid-template-rows: 500px min-content;
	}

	.editor-pane {
		@apply grid;
		grid-template-columns: 1fr;
		grid-template-rows: min-content min-content 1fr;
	}
</style>
