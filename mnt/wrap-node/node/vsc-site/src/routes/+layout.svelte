<script lang="ts">
	import '../app.css';

	import AppLayout from '$lib/layouts/app-layout.svelte';
	import ContentLayout from '$lib/layouts/content-layout.svelte';

	import { pageHistory } from '$lib/shared/store/page-history';
	import { beforeNavigate } from '$app/navigation';

	import type { LayoutData } from './$types';

	export let data: LayoutData;

	beforeNavigate(({ to }) => {
		const path = to?.route.id;
		console.log('navigate to', to);
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
		if (path === '/blog/[id]') {
			const pathname = to?.url.pathname ?? '/blog';
			const blogId = to?.params?.id ?? 'noid';
			const theRoute = data.routes.find((route) => route.id === blogId);
			if (theRoute) {
				pageHistory.push(pathname, { label: theRoute.title, path: pathname });
			}
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
