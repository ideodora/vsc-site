import { dev } from '$app/environment';
import { initializeApp } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

const app = initializeApp({
	projectId: 'event-001-bb028'
});

const _db = getFirestore(app);

// if (dev) {
console.log('dev connect to firestore emulator');
connectFirestoreEmulator(_db, 'firebase', 8080);
// }

// export function db() {
// 	return _db;
// }

export const db = _db;
