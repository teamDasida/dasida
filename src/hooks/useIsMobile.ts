import { useState, useEffect } from 'react';

export default function useIsMobile(threshold: number = 768): boolean {
  // 초기 값은 현재 창 너비가 threshold보다 작은지 여부로 설정
  const [isMobile, setIsMobile] = useState(window.innerWidth < threshold);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < threshold);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [threshold]);

  return isMobile;
}
