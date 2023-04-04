<script lang="ts">
	import '../app.css';

	import { beforeNavigate } from '$app/navigation';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import type { LayoutData } from './$types';

	import AppLayout from '$lib/layouts/app-layout.svelte';
	import ContentLayout from '$lib/layouts/content-layout.svelte';
	import { pageHistory } from '$lib/shared/store/page-history';

	export let data: LayoutData;

	const toastOptions = {
		reversed: true,
		intro: { y: 192 }
	};

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
			case '/settings.json':
				pageHistory.push(path, { label: 'settings.json', path });
				break;
			case '/inquiry':
				pageHistory.push(path, { label: 'contact me', path });
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

<SvelteToast options={toastOptions} />

<style lang="postcss">
	:root {
		--toastContainerTop: auto;
		--toastContainerRight: 5px;
		--toastContainerBottom: calc(1rem + 5px);
		--toastContainerLeft: auto;
		--toastContainerZIndex: 10001;
	}
	:global(.firebase-emulator-warning) {
		display: none;
	}
</style>
