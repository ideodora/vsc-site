import { dev } from '$app/environment';
import { getApps, initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

import {
	PUBLIC_FIREBASE_API_KEY,
	PUBLIC_FIREBASE_APP_ID,
	PUBLIC_FIREBASE_AUTH_DOMAIN,
	PUBLIC_FIREBASE_DATABASE_URL,
	PUBLIC_FIREBASE_MEASUREMENT_ID,
	PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	PUBLIC_FIREBASE_PROJECT_ID,
	PUBLIC_FIREBASE_STORAGE_BUCKET
} from '$env/static/public';

function makeApp() {
	const apps = getApps();
	if (apps.length > 0) {
		return apps[0]!;
	}

	if (dev) {
		return initializeApp({
			projectId: 'event-001-bb028',
			apiKey: 'xxx-yyy-zzz',
			messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
			appId: PUBLIC_FIREBASE_APP_ID
		});
	}

	return initializeApp({
		apiKey: PUBLIC_FIREBASE_API_KEY,
		authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
		databaseURL: PUBLIC_FIREBASE_DATABASE_URL,
		projectId: PUBLIC_FIREBASE_PROJECT_ID,
		storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
		messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
		appId: PUBLIC_FIREBASE_APP_ID,
		measurementId: PUBLIC_FIREBASE_MEASUREMENT_ID
	});
}

const app = makeApp();

const _db = getFirestore(app);

const _auth = getAuth(app);

if (dev) {
	console.log('dev connect to firestore emulator');

	try {
		connectFirestoreEmulator(_db, 'localhost', 8080);
	} catch (error) {
		console.error(error);
	}
	connectAuthEmulator(_auth, 'http://localhost:9099');
}

export const db = _db;
export const auth = _auth;
