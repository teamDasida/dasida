/* public/firebase-messaging-sw.js */
/* eslint-disable no-undef */

try {
    // 1) compat 라이브러리 로드 (v11.9.1)
    importScripts('https://www.gstatic.com/firebasejs/11.9.1/firebase-app-compat.js');
    importScripts('https://www.gstatic.com/firebasejs/11.9.1/firebase-messaging-compat.js');

    // 2) FCM 초기화 (Sender ID만 있으면 됩니다)
    firebase.initializeApp({
        apiKey: 'AIzaSyCo_Bpuqj2vnuxIT58ITdsPl5DULkU4C1w',
        projectId: 'dasida-b1f97',
        messagingSenderId: '35758650692',
        appId: '1:35758650692:web:5cc75b169150eca4a0d311',
    });

    // 3) 백그라운드 메시지 핸들러
    const messaging = firebase.messaging();
    messaging.onBackgroundMessage(({ notification, data }) => {
        console.log('[SW] payload', notification, data); //
        registration
            .showNotification(notification.title, {
                body: notification.body,
                icon: '/icons/icon-192x192.png',
                data, // 데이터 필드에 clickUrl 등이 들어있어야 합니다.
            })
            .then(() => console.log('[SW] showNotification OK')) //
            .catch((err) => console.error('[SW] showNotification ERR', err));
    });

    // 4) 클릭 시 동작: 이미 열린 탭이 있으면 focus, 없으면 새창으로 /home 열기
    self.addEventListener('notificationclick', (event) => {
        event.notification.close();

        // 알림 data 에 clickUrl 이 있으면 그걸, 없으면 /home
        const clickUrl = event.notification.data?.clickUrl || '/';

        event.waitUntil(
            clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
                for (const client of clientList) {
                    // 이미 열린 탭이 clickUrl 을 포함하고 있으면 포커스
                    if (client.url.includes(clickUrl) && 'focus' in client) {
                        return client.focus();
                    }
                }
                // 없으면 새 탭으로 연다
                if (clients.openWindow) {
                    return clients.openWindow(clickUrl);
                }
            })
        );
    });
} catch (err) {
    // SW 초기화나 핸들러 등록 중 에러 시
    console.error('🔥 firebase-messaging-sw.js init failed:', err);
}

// // public/firebase-messaging-sw.js
// // @ts-nocheck   ← 타입스크립트 검사 끄기(선택)

// /* eslint-disable */  // 필요하면 eslint도 끄기

// try {
//   importScripts(
//     'https://www.gstatic.com/firebasejs/11.9.1/firebase-app-compat.js',
//   );
//   importScripts(
//     'https://www.gstatic.com/firebasejs/11.9.1/firebase-messaging-compat.js',
//   );

//   firebase.initializeApp({
//     apiKey: 'AIzaSyCo_Bpuqj2vnuxIT58ITdsPl5DULkU4C1w',
//     projectId: 'dasida-b1f97',
//     messagingSenderId: '35758650692',
//     appId: '1:35758650692:web:5cc75b169150eca4a0d311',
//   });

//   const messaging = firebase.messaging();

//   messaging.onBackgroundMessage((payload) => {
//     console.log('[SW] background message:', payload);
//     // self.registration.showNotification(title, options);
//   });
// } catch (err) {
//   console.error('🔥 firebase-messaging-sw.js init failed:', err);
// }
