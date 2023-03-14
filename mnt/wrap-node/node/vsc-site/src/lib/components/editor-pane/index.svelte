<script lang="ts">
	import Breadcrumbs from '$lib/components/breadcrumbs/index.svelte';
	import LineNumbers from '$lib/components/line-numbers/index.svelte';
</script>

<Breadcrumbs />

<div class="wrap overflow-auto">
	<div class="p-2 flex">
		<LineNumbers />
		<main class="overflow-auto">
			<slot />
		</main>
	</div>
</div>
