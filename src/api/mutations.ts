import { useMutation, UseMutationResult } from '@tanstack/react-query';
import apiClient from './client'; // axios 인스턴스
import { AxiosError, AxiosResponse } from 'axios';

// 1. 제네릭 API 호출 함수 정의
const apiPostRequest = async <TRequest, TResponse>(url: string, data: TRequest): Promise<TResponse> => {
    const response: AxiosResponse<TResponse> = await apiClient.post(url, data);
    return response.data;
};

// 2. useMutation 훅을 제네릭 타입으로 정의 (mutation function을 올바르게 전달)
export const useGenericMutation = <TRequest, TResponse>(url: string): UseMutationResult<TResponse, AxiosError, TRequest> => {
    return useMutation<TResponse, AxiosError, TRequest>({
        mutationFn: (data: TRequest) => apiPostRequest<TRequest, TResponse>(url, data),
    });
};
