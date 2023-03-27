import { readable } from 'svelte/store';
import { auth } from '$lib/firebase';
import { onAuthStateChanged, type User } from 'firebase/auth';

export const user = readable<User | null>(
	undefined,
	(set) => onAuthStateChanged(auth, set)
	// dont linebreak
);

export function subscribeIgnoreFirst(fn: (state: User | null) => void) {
	let firedFirst = false;
	return user.subscribe((state) => {
		if (!firedFirst) {
			firedFirst = true;
		} else {
			fn(state);
		}
	});
}
