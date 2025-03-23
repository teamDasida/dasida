// src/query/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60, // 1분 동안 데이터가 신선하다고 판단
            refetchOnWindowFocus: true, // 창이 포커스 될 때마다 재패칭
        },
    },
});

export default queryClient;
