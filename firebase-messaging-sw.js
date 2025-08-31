/* public/firebase-messaging-sw.js */
/* eslint-disable no-undef */

try {
  // 1) Firebase compat SDK (v11.9.1)
  importScripts(
    "https://www.gstatic.com/firebasejs/11.9.1/firebase-app-compat.js"
  );
  importScripts(
    "https://www.gstatic.com/firebasejs/11.9.1/firebase-messaging-compat.js"
  );

  // 2) Firebase 초기화
  firebase.initializeApp({
    apiKey: "AIzaSyCo_Bpuqj2vnuxIT58ITdsPl5DULkU4C1w",
    projectId: "dasida-b1f97",
    messagingSenderId: "35758650692",
    appId: "1:35758650692:web:5cc75b169150eca4a0d311",
  });

  const messaging = firebase.messaging();

  // 3-A) FCM background message 핸들러
  messaging.onBackgroundMessage((payload) => {
    const notification = payload?.notification || {};
    const data = payload?.data || {};

    const title = notification.title || data.title || "알림";
    const body = notification.body || data.body || "";

    console.log("[SW] onBackgroundMessage", payload);

    self.registration.showNotification(title, {
      body,
      icon: "/icons/icon-192x192.png",
      data, // clickUrl 등 사용자 정의 데이터
    });
  });

  // 3-B) 표준 Web Push 이벤트 핸들러
  self.addEventListener("push", (event) => {
    console.log("[SW] push event", event);

    let payload = {};
    try {
      payload = event.data?.json() || {};
    } catch (_) {
      try {
        payload = JSON.parse(event.data?.text() || "{}");
      } catch {}
    }

    const notification = payload.notification || {};
    const data = payload.data || payload;

    const title = notification.title || data.title || "알림";
    const body = notification.body || data.body || "";

    event.waitUntil(
      self.registration.showNotification(title, {
        body,
        icon: "/icons/icon-192x192.png",
        data,
      })
    );
  });

  // 4) 알림 클릭 시 동작
  self.addEventListener("notificationclick", (event) => {
    event.notification.close();

    const clickUrl = event.notification?.data?.clickUrl || "/";
    const absoluteUrl = new URL(clickUrl, self.registration.scope).href;

    event.waitUntil(
      (async () => {
        const allClients = await clients.matchAll({
          type: "window",
          includeUncontrolled: true,
        });
        for (const client of allClients) {
          if (client.url === absoluteUrl && "focus" in client) {
            return client.focus();
          }
        }
        if ("openWindow" in clients) {
          return clients.openWindow(absoluteUrl);
        }
      })()
    );
  });
} catch (err) {
  console.error("🔥 firebase-messaging-sw.js init failed:", err);
}
