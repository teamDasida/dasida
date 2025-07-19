// src/ReloadPrompt.tsx
import { useRegisterSW } from 'virtual:pwa-register/react';

export default function ReloadPrompt() {
  const {
    offlineReady: [offlineReady],
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  if (!offlineReady && !needRefresh) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-lg">
      {offlineReady && '오프라인에서도 사용 가능해졌어요!'}
      {needRefresh && (
        <>
          새 버전이 있습니다.&nbsp;
          <button onClick={() => updateServiceWorker(true)} className="underline">
            새로고침
          </button>
        </>
      )}
    </div>
  );
}
