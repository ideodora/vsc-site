import { error } from '@sveltejs/kit';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import type { PageServerLoad } from './$types';

export const prerender = 'auto';

export const load = (async ({ params }) => {
	const post = await getPostFromDatabase(params.id);

	if (post) {
		return post;
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;

async function getPostFromDatabase(id: string) {
	const docRef = doc(db(), 'blog', id);
	const snapshot = await getDoc(docRef);
	const data = snapshot.data()!;
	const post = {
		id,
		postedAt: data.postedAt.toDate(),
		title: data.title,
		body: data.body
	};

	return { post };
}
