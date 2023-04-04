import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { db } from '$lib/firebase';
import { collection, query, getDocs, orderBy, limit } from 'firebase/firestore';
import { fetchRoutes } from '$lib/fetch-routes';

export const prerender = true;
// export const ssr = false;

export const load = (async () => {
	const post = await getPostFromDatabase();
	const recentUpdates = await getRecentBlogPosts();

	const archives = await fetchRoutes();

	if (post) {
		return { routes: post, recentUpdates, archives };
	}

	throw error(404, 'Not found');
}) satisfies LayoutLoad;

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
