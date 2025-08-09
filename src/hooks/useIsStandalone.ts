// src/hooks/useIsStandalone.ts
import { useEffect, useState } from 'react';

interface NavigatorStandalone extends Navigator {
  standalone?: boolean; // iOS Safari 에서만 존재
}

/** PWA(stand-alone 모드) 여부를 반환한다 */
export default function useIsStandalone() {
  const getStandalone = () =>
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as NavigatorStandalone).standalone === true;

  const [isStandalone, setIsStandalone] = useState(getStandalone);

  useEffect(() => {
    const mq = window.matchMedia('(display-mode: standalone)');
    const handler = () => setIsStandalone(getStandalone());

    if (mq.addEventListener) {
      mq.addEventListener('change', handler);
    } else {
      mq.addListener(handler);
    }

    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener('change', handler);
      } else {
        mq.removeListener(handler);
      }
    };
  }, []);

  return isStandalone;
}
