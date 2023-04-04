import { initializeApp, getApps } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';
import { getFirestore } from 'firebase-admin/firestore';

function makeApp() {
	const apps = getApps();
	if (apps.length > 0) {
		return apps[0]!;
	}

	return initializeApp();
}

const app = makeApp();

const _messaging = getMessaging(app);
const _db = getFirestore(app);

export const messaging = _messaging;
export const db = _db;
