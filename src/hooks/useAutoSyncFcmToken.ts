import { useEffect } from 'react';
import { registerPushToken, isStandalone, PUSH_AVAILABLE } from '../firebase';

const NEXT_SYNC_KEY = 'fcmNextSyncAt';
const MIN_COOLDOWN_MS = 1000 * 60 * 60 * 6; // 6 hours
const MAX_COOLDOWN_MS = 1000 * 60 * 60 * 12; // 12 hours

function scheduleNextSync(now: number) {
  const delay = MIN_COOLDOWN_MS + Math.random() * (MAX_COOLDOWN_MS - MIN_COOLDOWN_MS);
  localStorage.setItem(NEXT_SYNC_KEY, String(now + delay));
}

export default function useAutoSyncFcmToken() {
  useEffect(() => {
    if (!PUSH_AVAILABLE) return;
    const isMobile = /iPhone|iPad|iPod|Android/.test(navigator.userAgent);

    const sync = async () => {
      if (Notification.permission !== 'granted') return;
      if (isMobile && !isStandalone()) return;

      const next = Number(localStorage.getItem(NEXT_SYNC_KEY) || '0');
      const now = Date.now();
      if (next && now < next) return;

      await registerPushToken();
      scheduleNextSync(now);
    };

    const visibilityHandler = () => {
      if (!document.hidden) void sync();
    };

    void sync();
    window.addEventListener('focus', sync);
    document.addEventListener('visibilitychange', visibilityHandler);

    return () => {
      window.removeEventListener('focus', sync);
      document.removeEventListener('visibilitychange', visibilityHandler);
    };
  }, []);
}
