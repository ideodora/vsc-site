import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '$lib/firebase';
import { getDay, getMonth, getYear } from 'date-fns';

export async function fetchRoutes() {
	const collectionRef = query(collection(db, 'blog'), orderBy('postedAt', 'desc'));
	const snapshot = await getDocs(collectionRef);
	const items = snapshot.docs.map((doc) => {
		const data = doc.data()!;
		return {
			id: doc.id,
			title: data.title,
			postedAt: data.postedAt.toDate(),
			body: data.body // TODO: remove
		};
	});
	const mapped = items.reduce((accum, current) => {
		const date = current.postedAt;
		const year = getYear(date);
		const month = getMonth(date) + 1;
		const day = getDay(date);
		const chrono = { year, month, day };
		console.table(chrono);

		const yearContainer = accum.get(year) ?? { label: year, children: new Map() };
		const monthContainer = yearContainer.children.get(month) ?? { label: month, children: [] };
		monthContainer.children.push(current);
		yearContainer.children.set(month, monthContainer);
		accum.set(year, yearContainer);
		return accum;
	}, new Map());

	return mapped;
}
