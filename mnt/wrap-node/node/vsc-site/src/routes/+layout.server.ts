import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { db } from '$lib/firebase';
import { collection, query, getDocs, where, orderBy, limit } from 'firebase/firestore';

export const prerender = true;

export const load = (async () => {
	const post = await getPostFromDatabase();
	const recentUpdates = await getRecentBlogPosts();

	if (post) {
		return { routes: post, recentUpdates };
	}

	throw error(404, 'Not found');
}) satisfies LayoutServerLoad;

async function getPostFromDatabase() {
	const q = query(collection(db, 'blog'));
	const querySnapshot = await getDocs(q);
	const routes = querySnapshot.docs.map((doc) => {
		const data = doc.data();
		return {
			id: doc.id,
			title: data.title,
			postedAt: data.postedAt.toDate()
		};
	});
	return routes;
}

async function getRecentBlogPosts() {
	const q = query(collection(db, 'blog'), orderBy('postedAt', 'desc'), limit(5));
	const querySnapshot = await getDocs(q);
	const routes = querySnapshot.docs.map((doc) => {
		const data = doc.data();
		return {
			id: doc.id,
			title: data.title,
			postedAt: data.postedAt.toDate()
		};
	});
	return routes;
}
