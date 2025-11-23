// src/types/pwa.d.ts
export {}; // 모듈로 만들어 전역 오염 경고 방지

declare global {
  interface BeforeInstallPromptEvent extends Event {
    readonly platforms?: readonly string[];
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform?: string }>;
  }

  // 👇 이게 핵심: WindowEventMap에 이벤트 키를 등록
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}
