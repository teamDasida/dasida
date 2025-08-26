// firebase.ts ---------------------------------------------------------------
import { initializeApp, type FirebaseOptions, type FirebaseApp } from 'firebase/app';

import { getMessaging, type Messaging, getToken, onMessage, type MessagePayload } from 'firebase/messaging';
import axiosInstance from './api/axios';

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
// ★ PWA(standalone) 여부
export const isStandalone = (): boolean =>
    window.matchMedia('(display-mode: standalone)').matches;

// ★ iOS Safari에서 ‘홈 화면 추가’(standalone)인지 체크 (legacy export)
export const isIOSStandalone = (): boolean =>
    /iPhone|iPad|iPod/.test(navigator.userAgent) && isStandalone();

// ★ 푸시 API 지원 여부
export const PUSH_AVAILABLE = 'serviceWorker' in navigator && 'PushManager' in window;

/* ------------------------------------------------------------------ */
/* 3. 토큰 요청                                                        */
/* ------------------------------------------------------------------ */
/**
 * Service Worker가 준비된 뒤 FCM 토큰을 반환한다.
 * 권한 요청은 외부에서 수행해야 하며, 권한이 없으면 undefined를 반환한다.
 */
export async function getFcmToken(): Promise<string | undefined> {
    try {
        // 1) 환경 제약 --------------------------------------------------------
        if (!PUSH_AVAILABLE) {
            console.warn('[FCM] Push API not supported in this browser.');
            return undefined;
        }
        const isMobile = /iPhone|iPad|iPod|Android/.test(navigator.userAgent);
        if (isMobile && !isStandalone()) {
            console.warn('[FCM] 모바일에서는 홈 화면에 추가된 PWA에서만 Web Push가 가능합니다.');
            return undefined;
        }
        if (Notification.permission !== 'granted') return undefined;

        // 2) Service Worker 등록 및 준비 ------------------------------------
        const swReg = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        await navigator.serviceWorker.ready; // SW가 활성화될 때까지 대기

        // 3) 토큰 발급 -------------------------------------------------------
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
/* 4. 토큰 저장 및 서버 전송                                          */
/* ------------------------------------------------------------------ */
const FCM_TOKEN_KEY = 'fcmToken';

export async function registerPushToken(): Promise<void> {
    if (!PUSH_AVAILABLE || Notification.permission !== 'granted') return;

    const currentToken = await getFcmToken();
    if (!currentToken) return;

    const storedToken = localStorage.getItem(FCM_TOKEN_KEY);
    if (storedToken === currentToken) return;

    localStorage.setItem(FCM_TOKEN_KEY, currentToken);

    try {
        await axiosInstance.post('/token', { token: currentToken });
        console.debug('[FCM] 토큰 저장 완료');
    } catch (e) {
        console.error('[FCM] 토큰 저장 실패:', e);
    }
}

/* ------------------------------------------------------------------ */
/* 5. 권한 요청 (사용자 제스처 내에서 호출)                             */
/* ------------------------------------------------------------------ */
export async function enablePush(): Promise<void> {
    if (!PUSH_AVAILABLE) return;
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            await registerPushToken();
        }
    } catch (err) {
        console.error('[FCM] enable push failed:', err);
    }
}

/* ------------------------------------------------------------------ */
/* 6. 포그라운드 메시지 리스너                                         */
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
