import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { db } from './firebase';
import { collection, query, getDocs } from 'firebase/firestore';

export const prerender = 'auto';

export const load = (async () => {
	const post = await getPostFromDatabase();

	if (post) {
		return post;
	}

	throw error(404, 'Not found');
}) satisfies LayoutServerLoad;

async function getPostFromDatabase() {
	const q = query(collection(db(), 'blog'));
	const querySnapshot = await getDocs(q);
	const routes = querySnapshot.docs.map((doc) => {
		const data = doc.data();
		return {
			id: doc.id,
			title: data.title,
			postedAt: data.postedAt.toDate()
		};
	});
	return { routes };
}
