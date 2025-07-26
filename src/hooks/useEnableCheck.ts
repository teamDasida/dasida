// src/hooks/useEnableCheck.ts
import { useCallback } from 'react';
import axiosInstance from '../api/axios';

export function useEnableCheck() {
    /**
     * `/login-enabled` 호출 후 canSignUp 여부를 반환합니다.
     * 이미 로딩 중이면 즉시 false 반환으로 중복 호출 막기
     */
    const checkEnable = useCallback(async () => {
        try {
            const { data } = await axiosInstance.get<{ canSignUp: boolean }>('/login-enabled');
            console.log(data);

            return data.canSignUp;
        } catch (err) {
            console.log(err);
            return 'error';
        }
    }, []);

    return { checkEnable };
}
