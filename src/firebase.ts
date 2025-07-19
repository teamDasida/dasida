// firebase.ts ---------------------------------------------------------------
import { initializeApp, type FirebaseOptions, type FirebaseApp } from 'firebase/app';

import { getMessaging, type Messaging, getToken, onMessage, type MessagePayload } from 'firebase/messaging';

/* ------------------------------------------------------------------ */
/* 1. Firebase 초기화                                                 */
/* ------------------------------------------------------------------ */
const firebaseConfig: FirebaseOptions = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app: FirebaseApp = initializeApp(firebaseConfig);
export const messaging: Messaging = getMessaging(app);

/* ------------------------------------------------------------------ */
/* 2. 환경 감지 유틸                                                  */
/* ------------------------------------------------------------------ */
// ★ iOS Safari에서 ‘홈 화면 추가’(standalone)인지 체크
const isIOSStandalone = (): boolean =>
    /iPhone|iPad|iPod/.test(navigator.userAgent) && window.matchMedia('(display-mode: standalone)').matches;

// ★ 푸시 API 지원 여부
export const PUSH_AVAILABLE = 'serviceWorker' in navigator && 'PushManager' in window;

/* ------------------------------------------------------------------ */
/* 3. 토큰 요청                                                        */
/* ------------------------------------------------------------------ */
/**
 * 1) 환경 체크 → 2) 권한 요청 → 3) Service Worker 등록 → 4) FCM 토큰 반환
 * ❌ 조건 미충족 시 undefined 반환
 */
export async function getFcmToken(): Promise<string | undefined> {
    try {
        /* 1) 플랫폼 제약 --------------------------------------------------- */
        if (!PUSH_AVAILABLE) {
            console.warn('[FCM] Push API not supported in this browser.');
            return undefined;
        }
        if (/iPhone|iPad|iPod/.test(navigator.userAgent) && !isIOSStandalone()) {
            console.warn('[FCM] iOS에서는 홈 화면에 추가된 PWA에서만 Web Push가 가능합니다.');
            return undefined;
        }

        /* 2) 권한 요청 ----------------------------------------------------- */
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') return undefined;

        /* 3) Service Worker 등록 ----------------------------------------- */
        // public/ 루트에 firebase-messaging-sw.js 파일이 있어야 합니다.
        const swReg = await navigator.serviceWorker.register('/firebase-messaging-sw.js');

        /* 4) 토큰 발급 ----------------------------------------------------- */
        const token = await getToken(messaging, {
            vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
            serviceWorkerRegistration: swReg,
        });

        console.debug('[FCM] current token:', token);
        return token || undefined;
    } catch (err) {
        console.error('[FCM] token fetch error:', err);
        return undefined;
    }
}

/* ------------------------------------------------------------------ */
/* 4. 포그라운드 메시지 리스너                                         */
/* ------------------------------------------------------------------ */
export function onMessageListener(): Promise<MessagePayload> {
    return new Promise((resolve) => {
        onMessage(messaging, (payload) => resolve(payload));
    });
}

// import {
//     initializeApp, // ← 함수
//     type FirebaseOptions, // ← 타입
//     type FirebaseApp, // ← 타입
// } from 'firebase/app';

// import { getMessaging, type Messaging, getToken, onMessage, type MessagePayload } from 'firebase/messaging';

// const firebaseConfig: FirebaseOptions = {
//     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//     storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//     appId: import.meta.env.VITE_FIREBASE_APP_ID,
//     measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// };

// // Firebase 앱 초기화
// const app: FirebaseApp = initializeApp(firebaseConfig);

// // Messaging 인스턴스 생성
// export const messaging: Messaging = getMessaging(app);

// /**
//  * 퍼미션 요청 후 FCM 토큰을 반환합니다.
//  * @returns FCM 토큰 문자열 또는 undefined
//  */
// export async function requestNotificationPermission(): Promise<string | undefined> {
//     try {

//         // VAPID 키는 Firebase 콘솔 → 프로젝트 설정 → 클라우드 메시징 탭에서 발급
//         // const vapidKey = process.env.REACT_APP_FIREBASE_VAPID_KEY!;
//         const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;

//         const currentToken = await getToken(messaging, { vapidKey });
//         console.log('FCM 토큰:', currentToken);
//         return currentToken || undefined;
//     } catch (err) {
//         console.error('알림 권한 요청 중 에러:', err);
//         return undefined;
//     }
// }

// /**
//  * 포그라운드 메시지를 Promise로 감싸서 처리할 수 있도록 합니다.
//  */
// export function onMessageListener(): Promise<MessagePayload> {
//     return new Promise((resolve) => {
//         onMessage(messaging, (payload) => {
//             resolve(payload);
//         });
//     });
// }

// export async function getFcmToken(messaging: Messaging): Promise<string | undefined> {
//   try {
//     // ① 서비스워커를 직접 등록 (public/firebase-messaging-sw.js 에 파일 존재)
//     const swReg = await navigator.serviceWorker.register('/firebase-messaging-sw.js');

//     // ② 등록한 SW를 명시적으로 전달
//     const token = await getToken(messaging, {
//       vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
//       serviceWorkerRegistration: swReg,
//     });
//     return token || undefined;
//   } catch (err) {
//     console.error('[FCM] token fetch error:', err);
//     return undefined;
//   }
// }
