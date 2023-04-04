import type { Actions } from './$types';
import { RECAPTCHA_SITE_SECRET } from '$env/static/private';
import { messaging, db } from '$lib/firebase-server';
import { ContactForm } from './validate';

export const prerender = false;
// export const ssr = true;

const RECAPTCHA_API_URL = 'https://www.google.com/recaptcha/api/siteverify';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const token = data.get('reCaptchaToken');
		if (!token) return { success: false };
		if (!(await verifyToken(token.toString()))) {
			return { success: false };
		}

		await persistInquiryData(data);

		await sendNotificaiton();

		return { success: true };
	}
} satisfies Actions;

const verifyToken = async (token: string) => {
	const response = await fetch(RECAPTCHA_API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			secret: RECAPTCHA_SITE_SECRET, // シークレット
			response: token // トークン
		})
	});
	const json = await response.json();
	console.log('verify response', json);

	if ('success' in json) {
		// ボットかチェックしたい場合はscoreも見る
		return json.success;
	}
	return false;
};

const sendNotificaiton = async () => {
	const snapshot = await db.collection('notification').where('name', '==', 'pixel').get();
	const docs = snapshot.docs;
	console.log('found ', docs.length, ' docs');
	const doc = snapshot.docs[0];
	const docData = doc.data();
	console.log('doc data', docData);

	const message = {
		data: {
			score: '850',
			time: '2:45'
		},
		token: docData.token
	};

	try {
		const ret = await messaging.send(message);
		// Response is a message ID string.
		console.log('Successfully sent message:', ret);
	} catch (error) {
		console.error('Error sending message:', error);
	}
};

const persistInquiryData = async (formData: FormData) => {
	// validate with zod
	const formData2 = Object.fromEntries(formData);
	try {
		const values = ContactForm.parse(formData2);
		console.log(values);
	} catch (error) {
		console.error('zod error', error);
	}

	const subject = formData.get('subject');
	const email = formData.get('email');
	const body = formData.get('body');

	await db.collection('inquiry').add({
		email,
		subject,
		body,
		postedAt: new Date()
	});
};
