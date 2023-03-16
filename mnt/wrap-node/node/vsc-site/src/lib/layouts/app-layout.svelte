<script lang="ts">
	import AppBar from '$lib/components/appbar/index.svelte';
	import StatusBar from '$lib/components/statusbar/index.svelte';
</script>

<div class="fixed inset-0 bg-gray-800 outer-grid grid overflow-hidden">
	<AppBar />
	<slot />
	<StatusBar />
</div>

<style lang="postcss">
	.outer-grid {
		grid-template-columns: 1fr;
		grid-template-rows: min-content 1fr min-content;
	}
</style>
