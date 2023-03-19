<script>
	import '../app.css';

	import AppLayout from '$lib/layouts/app-layout.svelte';
	import ContentLayout from '$lib/layouts/content-layout.svelte';

	import { pageHistory } from '$lib/shared/store/page-history';
	import { beforeNavigate } from '$app/navigation';

	beforeNavigate(({ to }) => {
		const path = to?.route.id;
		if (path === undefined) return;
		switch (path) {
			case '/':
				pageHistory.push(path, { label: 'Welcome', path });
				break;
			case '/sample':
				pageHistory.push(path, { label: 'sample.html', path });
				break;
			case '/tsconfig.json':
				pageHistory.push(path, { label: 'tsconfig.json', path });
				break;
			default:
				break;
		}
	});
</script>

<AppLayout>
	<ContentLayout>
		<slot />
	</ContentLayout>
</AppLayout>

<style lang="postcss">
</style>
