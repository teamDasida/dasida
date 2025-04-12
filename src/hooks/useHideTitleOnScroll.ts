import { useState, useEffect, useRef } from 'react';
import throttle from 'lodash/throttle';
import useIsMobile from './useIsMobile';

const useHideTitleOnScroll = (throttleTime: number = 200): boolean => {
  const [hideTitle, setHideTitle] = useState<boolean>(false);
      const isMobile = useIsMobile();
  
  // 이전 스크롤 위치 저장 (초기값 0)
  const previousScrollY = useRef<number>(0);

  useEffect(() => {
    const handleScroll = throttle((): void => {
      const currentScrollY = window.pageYOffset;
      // 아래로 스크롤 중이고 현재 스크롤 위치가 0보다 클 경우 hideTitle을 true로 설정
      if (currentScrollY > previousScrollY.current && currentScrollY > 0 && isMobile) {
        setHideTitle(true);
      } else {
        // 위로 스크롤하거나 맨 위에 있는 경우 false로 설정
        setHideTitle(false);
      }
      previousScrollY.current = currentScrollY;
    }, throttleTime);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      // throttle 함수에 cancel 메서드가 있다면 클린업 시 호출
      if (handleScroll.cancel) {
        handleScroll.cancel();
      }
    };
  }, [throttleTime]);

  return hideTitle;
};

export default useHideTitleOnScroll;
