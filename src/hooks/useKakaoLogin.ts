// src/hooks/useKakaoLogin.ts
import { useCallback, useRef } from 'react';

export default function useKakaoLogin() {
    // 이 ref 하나만으로 충분
    const inFlight = useRef(false);

    const handleLogin = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        if (inFlight.current) return;
        inFlight.current = true;
        const url = `${import.meta.env.VITE_SERVER_URL}/oauth2/authorization/kakao`;
        console.log('redirect to:', url);
        window.location.href = url;
    }, []);

    return handleLogin;
}
