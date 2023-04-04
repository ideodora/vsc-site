importScripts('https://www.gstatic.com/firebasejs/9.18.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.18.0/firebase-analytics-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.18.0/firebase-messaging-compat.js');

firebase.initializeApp({
	apiKey: 'AIzaSyAFK-uKLEvUX-J_MNh6NbVipim6ZQI-CBM',
	authDomain: 'ideodora-blog2.firebaseapp.com',
	projectId: 'ideodora-blog2',
	storageBucket: 'ideodora-blog2.appspot.com',
	messagingSenderId: '152513452270',
	appId: '1:152513452270:web:e1ef770c074f126c34bbff'
});
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
	console.log('[firebase-messaging-sw.js] Received background message ', payload);
	// Customize notification here
	const notificationTitle = '問い合わせがありました';
	const notificationOptions = {
		body: 'Firestoreを見て内容確認してください',
		icon: '/AppIcons/playstore.png'
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
