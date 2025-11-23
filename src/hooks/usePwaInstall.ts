import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// ── 타입 선언 (전역 확장)
declare global {
  interface BeforeInstallPromptEvent extends Event {
    readonly platforms?: readonly string[];
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform?: string }>;
  }
}

type InstallSupport =
  | { supported: true; reason: null }
  | { supported: false; reason: 'ios' | 'standalone' | 'not-android' | 'no-event' };

function isAndroidUA(ua: string): boolean {
  return /Android/i.test(ua);
}

function isIOS(ua: string): boolean {
  // iPhone|iPad|iPod 또는 iOS 13+ iPadOS(크롬 UA 변경 등)까지 최대한 커버
  return /\b(iPhone|iPad|iPod)\b/i.test(ua) || /\bMacintosh\b/i.test(ua) && 'ontouchend' in document;
}

function isStandaloneNow(): boolean {
  const mm = window.matchMedia('(display-mode: standalone)');
  const iosStandalone = (navigator as unknown as { standalone?: boolean }).standalone === true;
  return mm.matches || iosStandalone;
}

export function usePwaInstall() {
  const [canInstall, setCanInstall] = useState<boolean>(false);
  const [isStandaloneState, setIsStandaloneState] = useState<boolean>(isStandaloneNow());
  const deferredRef = useRef<BeforeInstallPromptEvent | null>(null);

  // ✅ iOS → standalone → not-android → (지원) 순으로 판단
  const support: InstallSupport = useMemo(() => {
    const ua = window.navigator.userAgent;
    if (isStandaloneState) return { supported: false, reason: 'standalone' };
    if (isIOS(ua)) return { supported: false, reason: 'ios' };
    if (!isAndroidUA(ua)) return { supported: false, reason: 'not-android' };
    // 안드로이드 계열 + 미설치 → 이벤트 도착 전에는 'no-event'
    return deferredRef.current ? { supported: true, reason: null } : { supported: false, reason: 'no-event' };
  }, [isStandaloneState]);

  // beforeinstallprompt 수신
  useEffect(() => {
    const onBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault(); // 크롬 가이드: 자동 배너 막기
      deferredRef.current = e;
      setCanInstall(true);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
  }, []); // 최초 1회

  // 앱 설치 완료 시 상태 정리
  useEffect(() => {
    const onAppInstalled = () => {
      deferredRef.current = null;
      setCanInstall(false);
      setIsStandaloneState(true);
    };
    window.addEventListener('appinstalled', onAppInstalled);
    return () => window.removeEventListener('appinstalled', onAppInstalled);
  }, []);

  // display-mode 변경 감지(일부 브라우저에서 지원)
  useEffect(() => {
    const mm = window.matchMedia('(display-mode: standalone)');
    const handler = () => setIsStandaloneState(mm.matches || ((navigator as unknown as { standalone?: boolean }).standalone === true));
    if (typeof mm.addEventListener === 'function') {
      mm.addEventListener('change', handler);
      return () => mm.removeEventListener('change', handler);
    } else {
      // Safari 등 레거시
      mm.addListener?.(handler);
      return () => mm.removeListener?.(handler);
    }
  }, []);

  const promptInstall = useCallback(async (): Promise<'accepted' | 'dismissed' | 'unavailable'> => {
    const ev = deferredRef.current;
    if (!ev) return 'unavailable';

    await ev.prompt();
    try {
      const choice = await ev.userChoice;
      // 한 번 사용하면 재사용 불가 → 초기화
      deferredRef.current = null;
      setCanInstall(false);
      return choice.outcome;
    } catch {
      deferredRef.current = null;
      setCanInstall(false);
      return 'dismissed';
    }
  }, []); // ✅ stable handler

  return { canInstall, promptInstall, support };
}
