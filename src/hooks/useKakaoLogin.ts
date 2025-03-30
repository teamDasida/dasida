// src/hooks/useKakaoLogin.ts
import { useCallback } from 'react';

export default function useKakaoLogin() {
  const handleLogin = useCallback(() => {
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/oauth2/authorization/kakao`;
  }, []);

  return handleLogin;
}
