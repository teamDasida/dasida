
import {
    initializeApp, // ← 함수
    type FirebaseOptions, // ← 타입
    type FirebaseApp, // ← 타입
} from 'firebase/app';

import { getMessaging, type Messaging, getToken, onMessage, type MessagePayload } from 'firebase/messaging';

const firebaseConfig: FirebaseOptions = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Firebase 앱 초기화
const app: FirebaseApp = initializeApp(firebaseConfig);

// Messaging 인스턴스 생성
export const messaging: Messaging = getMessaging(app);

/**
 * 퍼미션 요청 후 FCM 토큰을 반환합니다.
 * @returns FCM 토큰 문자열 또는 undefined
 */
export async function requestNotificationPermission(): Promise<string | undefined> {
    try {
        // VAPID 키는 Firebase 콘솔 → 프로젝트 설정 → 클라우드 메시징 탭에서 발급
        // const vapidKey = process.env.REACT_APP_FIREBASE_VAPID_KEY!;
        const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;
        const currentToken = await getToken(messaging, { vapidKey });
        console.log('FCM 토큰:', currentToken);
        return currentToken || undefined;
    } catch (err) {
        console.error('알림 권한 요청 중 에러:', err);
        return undefined;
    }
}

/**
 * 포그라운드 메시지를 Promise로 감싸서 처리할 수 있도록 합니다.
 */
export function onMessageListener(): Promise<MessagePayload> {
    return new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });
}
