// public/firebase-messaging-sw.js
// @ts-nocheck   ← 타입스크립트 검사 끄기(선택)

/* eslint-disable */  // 필요하면 eslint도 끄기

try {
  importScripts(
    'https://www.gstatic.com/firebasejs/11.9.1/firebase-app-compat.js',
  );
  importScripts(
    'https://www.gstatic.com/firebasejs/11.9.1/firebase-messaging-compat.js',
  );

  firebase.initializeApp({
    apiKey: 'AIzaSyCo_Bpuqj2vnuxIT58ITdsPl5DULkU4C1w',
    projectId: 'dasida-b1f97',
    messagingSenderId: '35758650692',
    appId: '1:35758650692:web:5cc75b169150eca4a0d311',
  });

  const messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    console.log('[SW] background message:', payload);
    // self.registration.showNotification(title, options);
  });
} catch (err) {
  console.error('🔥 firebase-messaging-sw.js init failed:', err);
}
