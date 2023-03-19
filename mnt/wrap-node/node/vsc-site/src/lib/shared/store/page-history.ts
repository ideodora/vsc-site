import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

function createPageHistoryStore() {
	const { subscribe, set, update } = writable(
		new Map<string, any>([['/', { label: 'Welcome', path: '/' }]])
	);

	// init
	if (browser && localStorage.pageHistory) {
		set(new Map(JSON.parse(localStorage.pageHistory)));
	}

	return {
		subscribe,
		push: (path: string, value: any) =>
			update((n) => {
				n.set(path, value);

				// push
				if (browser) {
					localStorage.pageHistory = JSON.stringify([...n.entries()]);
				}

				return new Map(n);
			}),
		delete: (path: string) =>
			update((n) => {
				n.delete(path);

				// deite
				if (browser) {
					localStorage.pageHistory = JSON.stringify([...n.entries()]);
				}

				return new Map(n);
			})
	};
}

export const pageHistory = createPageHistoryStore();

export const pageHistoryArray = derived(pageHistory, ($pageHistory) => {
	return [...$pageHistory.values()];
});
