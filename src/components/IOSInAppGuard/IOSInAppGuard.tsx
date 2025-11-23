// src/components/IOSInAppGuard.tsx
import React, { memo, useMemo, useCallback } from 'react';

type InAppEnv =
  | { kind: 'safe' }
  | { kind: 'ios-inapp'; app: 'NAVER' | 'KAKAO' | 'LINE' | 'FB' | 'IG' | 'UNKNOWN' }
  | { kind: 'other' };

function isIOS(): boolean {
  const ua = navigator.userAgent;
  return /\b(iPhone|iPad|iPod)\b/i.test(ua) || (/\bMacintosh\b/i.test(ua) && 'ontouchend' in document);
}

function detectInAppEnv(ua: string): InAppEnv {
  if (!isIOS()) return { kind: 'other' };
  if (/NAVER/i.test(ua)) return { kind: 'ios-inapp', app: 'NAVER' };
  if (/KAKAOTALK/i.test(ua)) return { kind: 'ios-inapp', app: 'KAKAO' };
  if (/Line/i.test(ua)) return { kind: 'ios-inapp', app: 'LINE' };
  if (/FBAN|FBAV/i.test(ua)) return { kind: 'ios-inapp', app: 'FB' };
  if (/Instagram/i.test(ua)) return { kind: 'ios-inapp', app: 'IG' };
  if (/\bwv\b/i.test(ua)) return { kind: 'ios-inapp', app: 'UNKNOWN' };
  return { kind: 'safe' };
}

function openInSafari(url: string): void {
  // iOS 인앱에서 사파리 전환을 “보장”하진 못하지만, 전체 페이지 네비게이션이 가장 안전합니다.
  window.location.href = url;
}

type GuardProps = {
  children: React.ReactNode;
  safariUrl?: string;
};

export const IOSInAppGuard = memo(function IOSInAppGuard({ children, safariUrl }: GuardProps) {
  // UA는 세션 중 변하지 않으므로 deps=[]로 메모이제이션(불필요 재연산 방지)
  const env = useMemo<InAppEnv>(() => detectInAppEnv(navigator.userAgent), []);

  const handleOpenSafari = useCallback(() => {
    openInSafari(safariUrl ?? window.location.href);
  }, [safariUrl]); // safariUrl만 의존

  if (env.kind === 'ios-inapp') {
    const appName = env.app === 'UNKNOWN' ? '인앱 브라우저' : env.app;
    return (
      <div style={{ padding: 16 }}>
        <h3>이 브라우저에서는 일부 기능이 제한돼요</h3>
        <p>
          현재 <strong>{appName}</strong> 내장 브라우저에서 열려 있어요. Safari에서 다시 열면 정상 동작합니다.
        </p>
        <button type="button" onClick={handleOpenSafari}>Safari에서 열기</button>
        <p style={{ marginTop: 8, opacity: 0.8 }}>
          팁: 메뉴에서 “Safari로 열기” 항목이 보일 때도 있어요.
        </p>
      </div>
    );
  }

  return <>{children}</>;
});
