/* public/firebase-messaging-sw.js */

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

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const link = e.notification?.data?.link || "/";
  e.waitUntil(
    (async () => {
      const all = await clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });
      const hit = all.find(
        (c) =>
          new URL(c.url).pathname ===
          new URL(link, self.location.origin).pathname
      );
      return hit ? hit.focus() : clients.openWindow(link);
    })()
  );
});
