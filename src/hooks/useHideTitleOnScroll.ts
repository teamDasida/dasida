import { useState, useEffect, useRef } from 'react';
import throttle from 'lodash/throttle';
import useIsMobile from './useIsMobile';

const useHideTitleOnScroll = (throttleTime: number = 200): boolean => {
    const [hideTitle, setHideTitle] = useState<boolean>(false);
    const isMobile = useIsMobile();

    // 이전 스크롤 위치 저장 (초기값 0)
    const previousScrollY = useRef<number>(0);

    useEffect(() => {
        const handleScroll = throttle(() => {
            const currentScrollY = window.pageYOffset;

            // 1) 아래로 이동 중이고 100px 이상, 모바일
            const scrollingDown = currentScrollY > previousScrollY.current;
            const passedThreshold = currentScrollY > 100;

            if (scrollingDown && passedThreshold && isMobile) {
                setHideTitle(true);
            }
            // 2) 위로 움직였을 때만 false
            else if (currentScrollY < previousScrollY.current || currentScrollY <= 100) {
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
    }, [isMobile, throttleTime]);

    return hideTitle;
};

export default useHideTitleOnScroll;
