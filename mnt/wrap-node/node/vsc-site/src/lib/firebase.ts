// import { dev } from '$app/environment';
import { initializeApp, getApps } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectAuthEmulator, getAuth } from 'firebase/auth';

function makeApp() {
	const apps = getApps();
	if (apps.length > 0) {
		return apps[0]!;
	}

	return initializeApp({
		projectId: 'event-001-bb028',
		apiKey: 'xxx-yyy-zzz'
	});
}

const app = makeApp();

const _db = getFirestore(app);

const _auth = getAuth(app);

// if (dev) {
console.log('dev connect to firestore emulator');

// TODO: fix firestore conneciton
// from server need to firebase
// from browser need to localhost
connectFirestoreEmulator(_db, 'localhost', 8080);

connectAuthEmulator(_auth, 'http://localhost:9099');
// }

export const db = _db;
export const auth = _auth;
