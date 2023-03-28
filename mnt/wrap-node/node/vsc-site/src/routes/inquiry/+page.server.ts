import type { Actions } from './$types';
import { RECAPTCHA_SITE_SECRET } from '$env/static/private';

export const prerender = false;
export const ssr = true;

const RECAPTCHA_API_URL = 'https://www.google.com/recaptcha/api/siteverify';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const token = data.get('reCaptchaToken');
		if (!token) return { success: false };
		if (!(await verifyToken(token.toString()))) {
			return { success: false };
		}
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
