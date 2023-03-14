<script>
	import '../app.css';

	import AppLayout from '$lib/layouts/app-layout.svelte';
	import ContentLayout from '$lib/layouts/content-layout.svelte';
</script>

<AppLayout>
	<ContentLayout>
		<slot />
	</ContentLayout>
</AppLayout>

<style lang="postcss">
</style>
